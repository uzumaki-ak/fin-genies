// import { auth } from '@clerk/nextjs/server';
// import { PrismaClient } from '@prisma/client';
// import { Tool } from 'langchain/tools';

// const prisma = new PrismaClient();

// export class FinancialAnalysisTool extends Tool {
//   name = 'financial_analysis';
//   description = 'Analyzes user financial data including spending patterns, budget status, and savings rate';

//   async _call() {
//     try {
//       const { userId } = auth();
//       if (!userId) {
//         throw new Error('Unauthorized: User ID is required');
//       }

//       const currentDate = new Date();
//       const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

//       const [transactions, budget, accounts] = await Promise.all([
//         prisma.transaction.findMany({
//           where: {
//             userId,
//             date: { gte: firstDayOfMonth }
//           }
//         }),
//         prisma.budget.findFirst({ where: { userId } }),
//         prisma.account.findMany({ where: { userId } })
//       ]);

//       const spendingAnalysis = this.analyzeSpending(transactions);
//       const savingsAnalysis = this.analyzeSavings(transactions, accounts);
//       const budgetAnalysis = this.analyzeBudget(transactions, budget);

//       return JSON.stringify({
//         spending: spendingAnalysis,
//         savings: savingsAnalysis,
//         budget: budgetAnalysis
//       });
//     } catch (error) {
//       throw new Error(`Error in financial analysis: ${error.message}`);
//     } finally {
//       await prisma.$disconnect(); // ✅ Ensure Prisma disconnects after query
//     }
//   }

//   analyzeSpending(transactions) {
//     const expenses = transactions.filter(t => t.type === 'EXPENSE');
//     const totalSpending = expenses.reduce((sum, t) => sum + Number(t.amount), 0);

//     const categorySpending = expenses.reduce((acc, t) => {
//       acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
//       return acc;
//     }, {});

//     return {
//       total: totalSpending,
//       byCategory: categorySpending,
//       recurring: expenses
//         .filter(t => t.isRecurring)
//         .reduce((sum, t) => sum + Number(t.amount), 0)
//     };
//   }

//   analyzeSavings(transactions, accounts) {
//     const totalIncome = transactions
//       .filter(t => t.type === 'INCOME')
//       .reduce((sum, t) => sum + Number(t.amount), 0);

//     const totalSavings = accounts
//       .filter(a => a.type === 'SAVINGS')
//       .reduce((sum, a) => sum + Number(a.balance), 0);

//     const spendingTotal = this.analyzeSpending(transactions).total;

//     return {
//       rate: totalIncome > 0 ? ((totalIncome - spendingTotal) / totalIncome) * 100 : 0,
//       total: totalSavings
//     };
//   }

//   analyzeBudget(transactions, budget) {
//     const totalSpending = this.analyzeSpending(transactions).total;
//     const budgetAmount = Number(budget?.amount || 0);

//     return {
//       total: budgetAmount,
//       remaining: budgetAmount - totalSpending,
//       percentageUsed: budgetAmount > 0 ? (totalSpending / budgetAmount) * 100 : 0
//     };
//   }
// }

//i am using db instead of prisma client now

// import { auth } from '@clerk/nextjs/server';
// import { PrismaClient } from '@prisma/client';
// import { Tool } from '@langchain/core/tools';
// import { db } from '@/lib/prisma';

// const prisma = new PrismaClient();

// export class FinancialAnalysisTool extends Tool {
//   name = 'financial_analysis';
//   description = 'Analyzes user financial data including spending patterns, budget status, and savings rate';

//   constructor() {
//     super();
//   }

//   async _call(input) {
//     try {
//       const { userId } = await auth();
//       if (!userId) {
//         throw new Error('Unauthorized: User ID is required');
//       }

//       const currentDate = new Date();
//       const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

//       const [transactions, budget, accounts] = await Promise.all([
//         db.transaction.findMany({
//           where: {
//             userId,
//             date: { gte: firstDayOfMonth }
//           }
//         }),
//         db.budget.findFirst({ where: { userId } }),
//         db.account.findMany({ where: { userId } })
//       ]);

//       const spendingAnalysis = this.analyzeSpending(transactions);
//       const savingsAnalysis = this.analyzeSavings(transactions, accounts);
//       const budgetAnalysis = this.analyzeBudget(transactions, budget);

//       return JSON.stringify({
//         spending: spendingAnalysis,
//         savings: savingsAnalysis,
//         budget: budgetAnalysis
//       });
//     } catch (error) {
//       throw new Error(`Error in financial analysis: ${error.message}`);
//     } finally {
//       await db.$disconnect();
//     }
//   }

//   analyzeSpending(transactions) {
//     const expenses = transactions.filter(t => t.type === 'EXPENSE');
//     const totalSpending = expenses.reduce((sum, t) => sum + Number(t.amount), 0);

//     const categorySpending = expenses.reduce((acc, t) => {
//       acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
//       return acc;
//     }, {});

//     return {
//       total: totalSpending,
//       byCategory: categorySpending,
//       recurring: expenses
//         .filter(t => t.isRecurring)
//         .reduce((sum, t) => sum + Number(t.amount), 0)
//     };
//   }

//   analyzeSavings(transactions, accounts) {
//     const totalIncome = transactions
//       .filter(t => t.type === 'INCOME')
//       .reduce((sum, t) => sum + Number(t.amount), 0);

//     const totalSavings = accounts
//       .filter(a => a.type === 'SAVINGS')
//       .reduce((sum, a) => sum + Number(a.balance), 0);

//     const spendingTotal = this.analyzeSpending(transactions).total;

//     return {
//       rate: totalIncome > 0 ? ((totalIncome - spendingTotal) / totalIncome) * 100 : 0,
//       total: totalSavings
//     };
//   }

//   analyzeBudget(transactions, budget) {
//     const totalSpending = this.analyzeSpending(transactions).total;
//     const budgetAmount = Number(budget?.amount || 0);

//     return {
//       total: budgetAmount,
//       remaining: budgetAmount - totalSpending,
//       percentageUsed: budgetAmount > 0 ? (totalSpending / budgetAmount) * 100 : 0
//     };
//   }
// }

//claud ai
// import { Tool } from "@langchain/core/tools";
// import { db } from "@/lib/prisma";

// export class FinancialAnalysisTool extends Tool {
//   name = "financial_advisor";
//   description = "Analyzes financial data and provides personalized advice";

//   constructor() {
//     super();
//   }

//   async _call(input) {
//     try {
//       const { userId } = input;
//       if (!userId) {
//         throw new Error("Unauthorized: User ID is required");
//       }

//       // Get date ranges
//       const currentDate = new Date();
//       const firstDayOfMonth = new Date(
//         currentDate.getFullYear(),
//         currentDate.getMonth(),
//         1
//       );
//       const lastMonthStart = new Date(
//         currentDate.getFullYear(),
//         currentDate.getMonth() - 1,
//         1
//       );

//       // Fetch all required data
//       const [
//         currentTransactions,
//         lastMonthTransactions,
//         accounts,
//         budget,
//         recurringExpenses,
//       ] = await Promise.all([
//         // Current month transactions
//         db.transaction.findMany({
//           where: {
//             userId,
//             date: {
//               gte: firstDayOfMonth,
//             },
//           },
//         }),

//         // Last month transactions
//         db.transaction.findMany({
//           where: {
//             userId,
//             date: {
//               gte: lastMonthStart,
//               lt: firstDayOfMonth,
//             },
//           },
//         }),

//         // All accounts
//         db.account.findMany({
//           where: {
//             userId,
//           },
//         }),

//         // Current budget
//         db.budget.findUnique({
//           where: {
//             userId,
//           },
//         }),

//         // Recurring expenses
//         db.transaction.findMany({
//           where: {
//             userId,
//             isRecurring: true,
//             date: {
//               gte: lastMonthStart,
//             },
//           },
//         }),
//       ]);

//       // Analyze current month
//       const currentMonthAnalysis = {
//         spending: this.analyzeSpending(currentTransactions),
//         progress: this.calculateMonthProgress(),
//         budget: this.analyzeBudget(currentTransactions, budget),
//       };

//       // Analyze last month
//       const lastMonthAnalysis = {
//         spending: this.analyzeSpending(lastMonthTransactions),
//         topCategories: this.getTopCategories(lastMonthTransactions),
//         summary: this.createMonthlySummary(lastMonthTransactions),
//       };

//       // Analyze accounts and savings
//       const financialSnapshot = {
//         accounts: this.summarizeAccounts(accounts),
//         savings: this.analyzeSavings(currentTransactions, accounts),
//         recurringExpenses: this.analyzeRecurringExpenses(recurringExpenses),
//       };

//       // Return comprehensive analysis
//       return JSON.stringify({
//         currentMonth: currentMonthAnalysis,
//         lastMonth: lastMonthAnalysis,
//         financialSnapshot,
//         insights: this.generateInsights({
//           current: currentMonthAnalysis,
//           last: lastMonthAnalysis,
//           snapshot: financialSnapshot,
//         }),
//       });
//     } catch (error) {
//       console.error("Financial advisor error:", error);
//       throw new Error(`Error in financial analysis: ${error.message}`);
//     }
//   }

//   calculateMonthProgress() {
//     const now = new Date();
//     const daysInMonth = new Date(
//       now.getFullYear(),
//       now.getMonth() + 1,
//       0
//     ).getDate();
//     return (now.getDate() / daysInMonth) * 100;
//   }

//   analyzeSpending(transactions) {
//     const expenses = transactions.filter((t) => t.type === "EXPENSE");
//     const totalSpending = expenses.reduce(
//       (sum, t) => sum + Number(t.amount.toString()),
//       0
//     );

//     const categorySpending = expenses.reduce((acc, t) => {
//       acc[t.category] = (acc[t.category] || 0) + Number(t.amount.toString());
//       return acc;
//     }, {});

//     return {
//       total: totalSpending,
//       byCategory: categorySpending,
//       transactionCount: expenses.length,
//       averageTransaction: totalSpending / (expenses.length || 1),
//     };
//   }

//   getTopCategories(transactions) {
//     const categoryTotals = transactions.reduce((acc, t) => {
//       if (t.type === "EXPENSE") {
//         acc[t.category] = (acc[t.category] || 0) + Number(t.amount.toString());
//       }
//       return acc;
//     }, {});

//     return Object.entries(categoryTotals)
//       .sort(([, a], [, b]) => b - a)
//       .slice(0, 5)
//       .map(([category, amount]) => ({
//         category,
//         amount,
//         percentage:
//           (amount / this.analyzeSpending(transactions).total) * 100,
//       }));
//   }

//   summarizeAccounts(accounts) {
//     const totalBalance = accounts.reduce(
//       (sum, acc) => sum + Number(acc.balance.toString()),
//       0
//     );
//     const byType = accounts.reduce((acc, account) => {
//       acc[account.type] = (acc[account.type] || 0) + Number(account.balance.toString());
//       return acc;
//     }, {});

//     return {
//       totalBalance,
//       accountCount: accounts.length,
//       byType,
//       accounts: accounts.map((acc) => ({
//         name: acc.name,
//         type: acc.type,
//         balance: Number(acc.balance.toString()),
//       })),
//     };
//   }

//   analyzeBudget(transactions, budget) {
//     const spending = this.analyzeSpending(transactions);
//     const budgetAmount = budget ? Number(budget.amount.toString()) : 0;
//     const monthProgress = this.calculateMonthProgress();

//     return {
//       total: budgetAmount,
//       spent: spending.total,
//       remaining: budgetAmount - spending.total,
//       percentageUsed: (spending.total / budgetAmount) * 100,
//       status: this.getBudgetStatus(spending.total, budgetAmount, monthProgress),
//     };
//   }

//   getBudgetStatus(spent, budget, progress) {
//     if (budget === 0) return "NO_BUDGET";
//     const expectedSpending = (budget * progress) / 100;
//     if (spent > budget) return "EXCEEDED";
//     if (spent > expectedSpending * 1.1) return "WARNING";
//     if (spent < expectedSpending * 0.5) return "UNDERSPENT";
//     return "ON_TRACK";
//   }

//   analyzeRecurringExpenses(transactions) {
//     const recurringTotal = transactions.reduce(
//       (sum, t) => sum + Number(t.amount.toString()),
//       0
//     );
//     const byCategory = transactions.reduce((acc, t) => {
//       acc[t.category] = (acc[t.category] || 0) + Number(t.amount.toString());
//       return acc;
//     }, {});

//     return {
//       total: recurringTotal,
//       byCategory,
//       count: transactions.length,
//     };
//   }

//   analyzeSavings(transactions, accounts) {
//     const income = transactions
//       .filter((t) => t.type === "INCOME")
//       .reduce((sum, t) => sum + Number(t.amount.toString()), 0);

//     const expenses = transactions
//       .filter((t) => t.type === "EXPENSE")
//       .reduce((sum, t) => sum + Number(t.amount.toString()), 0);

//     const savingsAccounts = accounts.filter((a) => a.type === "SAVINGS");
//     const totalSavings = savingsAccounts.reduce(
//       (sum, a) => sum + Number(a.balance.toString()),
//       0
//     );

//     return {
//       currentSavings: totalSavings,
//       monthlySavings: income - expenses,
//       savingsRate: income > 0 ? ((income - expenses) / income) * 100 : 0,
//     };
//   }

//   generateInsights({ current, last, snapshot }) {
//     const insights = [];

//     // Budget insights
//     if (current.budget.status === "WARNING") {
//       insights.push({
//         type: "warning",
//         message: "Spending is higher than expected for this point in the month",
//       });
//     }

//     // Spending pattern insights
//     const spendingIncrease =
//       ((current.spending.total - last.spending.total) /
//         last.spending.total) *
//       100;
//     if (spendingIncrease > 20) {
//       insights.push({
//         type: "alert",
//         message: `Spending has increased by ${spendingIncrease.toFixed(
//           1
//         )}% compared to last month`,
//       });
//     }

//     // Savings insights
//     if (snapshot.savings.savingsRate < 20) {
//       insights.push({
//         type: "suggestion",
//         message: "Consider increasing your monthly savings rate to at least 20%",
//       });
//     }

//     return insights;
//   }

//   createMonthlySummary(transactions) {
//     const income = transactions
//       .filter((t) => t.type === "INCOME")
//       .reduce((sum, t) => sum + Number(t.amount.toString()), 0);

//     const expenses = transactions
//       .filter((t) => t.type === "EXPENSE")
//       .reduce((sum, t) => sum + Number(t.amount.toString()), 0);

//     return {
//       income,
//       expenses,
//       netSavings: income - expenses,
//       savingsRate: income > 0 ? ((income - expenses) / income) * 100 : 0,
//     };
//   }
// }

//new deepseek code

import { Tool } from "@langchain/core/tools";
import { db } from "@/lib/prisma";

export class FinancialAnalysisTool extends Tool {
  name = "financial_advisor";
  description = "Analyzes financial data and provides personalized advice";

  constructor() {
    super();
  }

  async _call(input) {
    try {
      const { userId } = input;
      if (!userId) {
        throw new Error("Unauthorized: User ID is required");
      }

      // Get date ranges
      const currentDate = new Date();
      const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const lastMonthStart = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      );

      // Fetch all required data
      const [
        currentTransactions,
        lastMonthTransactions,
        accounts,
        budget,
        recurringExpenses,
      ] = await Promise.all([
        // Current month transactions
        db.transaction.findMany({
          where: {
            userId,
            date: {
              gte: firstDayOfMonth,
            },
          },
        }),

        // Last month transactions
        db.transaction.findMany({
          where: {
            userId,
            date: {
              gte: lastMonthStart,
              lt: firstDayOfMonth,
            },
          },
        }),

        // All accounts
        db.account.findMany({
          where: {
            userId,
          },
        }),

        // Current budget
        db.budget.findUnique({
          where: {
            userId,
          },
        }),

        // Recurring expenses
        db.transaction.findMany({
          where: {
            userId,
            isRecurring: true,
            date: {
              gte: lastMonthStart,
            },
          },
        }),
      ]);

      // Analyze current month
      const currentMonthAnalysis = {
        spending: this.analyzeSpending(currentTransactions),
        progress: this.calculateMonthProgress(),
        budget: this.analyzeBudget(currentTransactions, budget),
      };

      // Analyze last month
      const lastMonthAnalysis = {
        spending: this.analyzeSpending(lastMonthTransactions),
        topCategories: this.getTopCategories(lastMonthTransactions),
        summary: this.createMonthlySummary(lastMonthTransactions),
      };

      // Analyze accounts and savings
      const financialSnapshot = {
        accounts: this.summarizeAccounts(accounts),
        savings: this.analyzeSavings(currentTransactions, accounts),
        recurringExpenses: this.analyzeRecurringExpenses(recurringExpenses),
      };

      // Return comprehensive analysis
      return JSON.stringify({
        currentMonth: currentMonthAnalysis,
        lastMonth: lastMonthAnalysis,
        financialSnapshot,
        insights: this.generateInsights({
          current: currentMonthAnalysis,
          last: lastMonthAnalysis,
          snapshot: financialSnapshot,
        }),
      });
    } catch (error) {
      console.error("Financial advisor error:", error);
      throw new Error(`Error in financial analysis: ${error.message}`);
    }
  }

  calculateMonthProgress() {
    const now = new Date();
    const daysInMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0
    ).getDate();
    return (now.getDate() / daysInMonth) * 100;
  }

  analyzeSpending(transactions) {
    const expenses = transactions.filter((t) => t.type === "EXPENSE");
    const totalSpending = expenses.reduce(
      (sum, t) => sum + Number(t.amount.toString()),
      0
    );

    const categorySpending = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount.toString());
      return acc;
    }, {});

    return {
      total: totalSpending,
      byCategory: categorySpending,
      transactionCount: expenses.length,
      averageTransaction: totalSpending / (expenses.length || 1),
    };
  }

  getTopCategories(transactions) {
    const categoryTotals = transactions.reduce((acc, t) => {
      if (t.type === "EXPENSE") {
        acc[t.category] = (acc[t.category] || 0) + Number(t.amount.toString());
      }
      return acc;
    }, {});

    return Object.entries(categoryTotals)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage:
          (amount / this.analyzeSpending(transactions).total) * 100,
      }));
  }

  summarizeAccounts(accounts) {
    const totalBalance = accounts.reduce(
      (sum, acc) => sum + Number(acc.balance.toString()),
      0
    );
    const byType = accounts.reduce((acc, account) => {
      acc[account.type] = (acc[account.type] || 0) + Number(account.balance.toString());
      return acc;
    }, {});

    return {
      totalBalance,
      accountCount: accounts.length,
      byType,
      accounts: accounts.map((acc) => ({
        name: acc.name,
        type: acc.type,
        balance: Number(acc.balance.toString()),
      })),
    };
  }

  analyzeBudget(transactions, budget) {
    const spending = this.analyzeSpending(transactions);
    const budgetAmount = budget ? Number(budget.amount.toString()) : 0;
    const monthProgress = this.calculateMonthProgress();

    return {
      total: budgetAmount,
      spent: spending.total,
      remaining: budgetAmount - spending.total,
      percentageUsed: (spending.total / budgetAmount) * 100,
      status: this.getBudgetStatus(spending.total, budgetAmount, monthProgress),
    };
  }

  getBudgetStatus(spent, budget, progress) {
    if (budget === 0) return "NO_BUDGET";
    const expectedSpending = (budget * progress) / 100;
    if (spent > budget) return "EXCEEDED";
    if (spent > expectedSpending * 1.1) return "WARNING";
    if (spent < expectedSpending * 0.5) return "UNDERSPENT";
    return "ON_TRACK";
  }

  analyzeRecurringExpenses(transactions) {
    const recurringTotal = transactions.reduce(
      (sum, t) => sum + Number(t.amount.toString()),
      0
    );
    const byCategory = transactions.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount.toString());
      return acc;
    }, {});

    return {
      total: recurringTotal,
      byCategory,
      count: transactions.length,
    };
  }

  analyzeSavings(transactions, accounts) {
    const income = transactions
      .filter((t) => t.type === "INCOME")
      .reduce((sum, t) => sum + Number(t.amount.toString()), 0);

    const expenses = transactions
      .filter((t) => t.type === "EXPENSE")
      .reduce((sum, t) => sum + Number(t.amount.toString()), 0);

    const savingsAccounts = accounts.filter((a) => a.type === "SAVINGS");
    const totalSavings = savingsAccounts.reduce(
      (sum, a) => sum + Number(a.balance.toString()),
      0
    );

    return {
      currentSavings: totalSavings,
      monthlySavings: income - expenses,
      savingsRate: income > 0 ? ((income - expenses) / income) * 100 : 0,
    };
  }

  generateInsights({ current, last, snapshot }) {
    const insights = [];

    // Budget insights
    if (current.budget.status === "WARNING") {
      insights.push({
        type: "warning",
        message: "Spending is higher than expected for this point in the month",
      });
    }

    // Spending pattern insights
    const spendingIncrease =
      ((current.spending.total - last.spending.total) /
        last.spending.total) *
      100;
    if (spendingIncrease > 20) {
      insights.push({
        type: "alert",
        message: `Spending has increased by ${spendingIncrease.toFixed(
          1
        )}% compared to last month`,
      });
    }

    // Savings insights
    if (snapshot.savings.savingsRate < 20) {
      insights.push({
        type: "suggestion",
        message: "Consider increasing your monthly savings rate to at least 20%",
      });
    }

    return insights;
  }

  createMonthlySummary(transactions) {
    const income = transactions
      .filter((t) => t.type === "INCOME")
      .reduce((sum, t) => sum + Number(t.amount.toString()), 0);

    const expenses = transactions
      .filter((t) => t.type === "EXPENSE")
      .reduce((sum, t) => sum + Number(t.amount.toString()), 0);

    return {
      income,
      expenses,
      netSavings: income - expenses,
      savingsRate: income > 0 ? ((income - expenses) / income) * 100 : 0,
    };
  }
}
