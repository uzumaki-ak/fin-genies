import { db } from "@/lib/prisma";

const toNumber = (value) => (value == null ? 0 : Number(value));

const toIsoDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return date.toISOString().slice(0, 10);
};

export async function getFinanceSnapshotByClerkId(clerkUserId) {
  if (!clerkUserId) {
    return null;
  }

  const user = await db.user.findUnique({
    where: { clerkUserId },
    select: { id: true, name: true, email: true },
  });

  if (!user) {
    return null;
  }

  const currentDate = new Date();
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  const [accounts, budget, recentTransactions, monthTransactions] = await Promise.all([
    db.account.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        name: true,
        type: true,
        balance: true,
        isDefault: true,
      },
    }),
    db.budget.findUnique({
      where: { userId: user.id },
      select: { amount: true, updatedAt: true },
    }),
    db.transaction.findMany({
      where: { userId: user.id },
      orderBy: { date: "desc" },
      take: 12,
      select: {
        id: true,
        accountId: true,
        type: true,
        amount: true,
        category: true,
        description: true,
        date: true,
      },
    }),
    db.transaction.findMany({
      where: {
        userId: user.id,
        date: { gte: startOfMonth },
      },
      select: {
        type: true,
        amount: true,
        category: true,
      },
    }),
  ]);

  const normalizedAccounts = accounts.map((account) => ({
    ...account,
    balance: toNumber(account.balance),
  }));

  const normalizedTransactions = recentTransactions.map((transaction) => ({
    ...transaction,
    amount: toNumber(transaction.amount),
    date: toIsoDate(transaction.date),
  }));

  const monthlyIncome = monthTransactions
    .filter((transaction) => transaction.type === "INCOME")
    .reduce((total, transaction) => total + toNumber(transaction.amount), 0);

  const monthlyExpenses = monthTransactions
    .filter((transaction) => transaction.type === "EXPENSE")
    .reduce((total, transaction) => total + toNumber(transaction.amount), 0);

  const expenseByCategory = monthTransactions
    .filter((transaction) => transaction.type === "EXPENSE")
    .reduce((acc, transaction) => {
      const category = transaction.category || "Other";
      acc[category] = (acc[category] || 0) + toNumber(transaction.amount);
      return acc;
    }, {});

  const totalBalance = normalizedAccounts.reduce(
    (total, account) => total + account.balance,
    0
  );

  return {
    user,
    currency: "INR",
    accountCount: normalizedAccounts.length,
    totalBalance,
    defaultAccount:
      normalizedAccounts.find((account) => account.isDefault)?.name || null,
    accounts: normalizedAccounts,
    budget: budget
      ? {
          amount: toNumber(budget.amount),
          updatedAt: toIsoDate(budget.updatedAt),
        }
      : null,
    monthToDate: {
      income: monthlyIncome,
      expenses: monthlyExpenses,
      net: monthlyIncome - monthlyExpenses,
      expenseByCategory,
    },
    recentTransactions: normalizedTransactions,
  };
}

export function buildFinanceSystemPrompt(snapshot, isAuthenticated = false) {
  const baseInstructions = `
You are Finance Mang's AI financial assistant.

Rules:
- Prioritize the authenticated user's own database data.
- Never invent account names, balances, transactions, or budget numbers.
- If a metric is missing, say it is unavailable and suggest the user add data.
- Keep replies practical, concise, and actionable.
- Use markdown lists/tables where helpful.
- Currency is INR unless the user asks otherwise.
- If asked something unrelated to personal finance or app usage, briefly decline and redirect to finance topics.
`.trim();

  if (!snapshot) {
    return `${baseInstructions}

${isAuthenticated
  ? "The user is signed in but no synced finance snapshot is available yet. Guide them to create an account and add transactions first."
  : "The user is not authenticated, or no user snapshot is available. Give general finance help and invite them to sign in for personalized answers."}`;
  }

  return `${baseInstructions}

Authenticated user finance snapshot (source of truth):
${JSON.stringify(snapshot, null, 2)}
`;
}
