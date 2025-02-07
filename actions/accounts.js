"use server";

// server action related to accoutn i men when one acc is turned on default thr other getts turn off autoatically

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

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

// creating server acton
export async function updateDefaultAccount(accountId) {
  // checkinn if user is legit
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("unauthorized");

    // finding user accs

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("user not found");
    }

    // if ac def make all other not def

    await db.account.updateMany({
      where: { userId: user.id, isDefault: true },
      data: { isDefault: false },
    });
    // update the acc with new def
    const account = await db.account.update({
      where: {
        id: accountId,
        userId: user.id,
      },
      data: { isDefault: true },
    });
    revalidatePath("/dashboard");
    return { success: true, data: serializeTransaction(account) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getAccountWithTransactions(accountId) {
  //verify useer
  const { userId } = await auth();
  if (!userId) throw new Error("unauthorized");

  // finding user accs

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("user not found");
  }

  // finding particulr acc
  const account = await db.account.findUnique({
    where: { id: accountId, userId: user.id },
    // we also need transcations

    include: {
      transactions: {
        orderBy: { date: "desc" },
      },
      _count: {
        select: {
          transactions: true,
        },
      },
    },
  });
  if (!account) return null;

  return {
    ...serializeTransaction(account),
    transactions: account.transactions.map(serializeTransaction),
  };
}

//delete a transaction from the database

export async function bulkDeleteTransactions(transactionIds) {
  try {
    //verify useer
    const { userId } = await auth();
    if (!userId) throw new Error("unauthorized");

    // finding user accs

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("user not found");
    }

    // fetch tnrs so w clcl blnc chnges
    const transactions = await db.transaction.findMany({
      where: {
        id: { in: transactionIds },
        userId: user.id,
      },
    });

    // clc amnt for wheterh its incone or expnses
    const accountBlanaceChanges = transactions.reduce((acc, transaction) => {
      const change =
        transaction.type === "EXPENSE"
          ? transaction.amount
          : -transaction.amount;

      acc[transaction.accountId] = (acc[transaction.accountId] || 0) + change;
      return acc;
    }, {});

    //dlet transactions and upd acc bknc in transactiona
    await db.$transaction(async (tx) => {
      // deleet trans
      await tx.transaction.deleteMany({
        where: {
          id: { in: transactionIds },
          userId: user.id,
        },
      });

      // updt trsn , blnc
      for (const [accountId, balanceChange] of Object.entries(
        accountBlanaceChanges
      )) {
        await tx.account.update({
          where: { id: accountId },
          data: {
            balance: {
              increment: balanceChange,
            },
          },
        });
      }
    });
    revalidatePath("/dashboard")
    revalidatePath("/account/[id]");

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
