"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

//  converting balance to number as next dsnt act deciml
const serializeTransaction = (obj) => {
  const serialized = { ...obj };

  if (obj.balance) {
    serialized.balance = obj.balance.toNumber();
  }
  if (obj.amount) {
    serialized.amount = obj.amount.toNumber();
  }
  return serialized;
};

export async function createAccount(data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("user not found");
    }

    // converting balnce to flot before saving
    const balanceFloat = parseFloat(data.balance);
    // checking if blnce exit or not nan:notanumber
    if (isNaN(balanceFloat)) {
      throw new Error("Invalid balance");
    }
    //checking if dis usr 1st ac
    const existingAccounts = await db.account.findMany({
      where: { userId: user.id },
    });

    const shouldBeDeafult =
      existingAccounts.length === 0 ? true : data.isDefault;

    //  if acc shoulbdef mak all other not defaut

    if (shouldBeDeafult) {
      await db.account.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    // crerate new acc
    const account = await db.account.create({
      data: {
        ...data,
        balance: balanceFloat,
        userId: user.id,
        isDefault: shouldBeDeafult,
      },
    });

    const serializedAccount = serializeTransaction(account);

    //  dis revaldth helps refetch values or info fro the page
    revalidatePath("/dashboard");
    return { success: true, data: serializedAccount };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getUserAccounts() {
  const { userId } = await auth();
  if (!userId) throw new Error("unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("user not found");
  }
  // now find accoutn
  const accounts = await db.account.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: {
          transactions: true,
        },
      },
    },
  });
  const serializedAccount = accounts.map(serializeTransaction);
  return serializedAccount
}

// later on when we go on to add the transactions the transaction amount will also be needed to convert to number from decimal line 14 to 16

export async function getDashboardData() {
  const { userId } = await auth();
  if (!userId) throw new Error("unauthorized");
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) {
    throw new Error("user not found");
  }

  // get all user transaction 
  const transactions = await db.transaction.findMany({
    where: {userId: user.id},
    orderBy: {date: "desc"},
  })
}