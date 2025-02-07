"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getCurrentBudegt(accountId) {
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

    //finding budget
    const budget = await db.budget.findFirst({
      where: {
        userId: user.id,
      },
    });

    // gwtng current moonth expense
    const currentDate = new Date();
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    // 1.al  expnses get 2. cal or add al of expenses aggrgt cpmes from prisma gte grtr th lte less thn or =
    const expenses = await db.transaction.aggregate({
      where: {
        userId: user.id,
        type: "EXPENSE",
        date: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
        accountId,
      },
      _sum: {
        amount: true,
      },
    });

    // 2.calc wthr to budget
    return {
      budget: budget ? { ...budget, amount: budget.amount.toNumber() } : null,
      currentExpenses: expenses._sum.amount
        ? expenses._sum.amount.toNumber()
        : 0,
    };
  } catch (error) {
    console.log("Erroe fetching budget:", error);
    throw error;
  }
}

// above was for fetching now Updating

export async function updateBudget(amount) {
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

    // now eithr create or upd if exit upd else create
    const budget = await db.budget.upsert({
      where: {
        userId: user.id,
      },
      update: {
        amount,
      },
      create: {
        userId: user.id,
        amount,
      },
    });

    revalidatePath("/dashboard");
    return {
      success: true,
      data: { ...budget, amount: budget.amount.toNumber() },
    };
  } catch (error) {
    console.log("Error updating budget:", error);
    return { success: false, error: error.message };
  }
}
