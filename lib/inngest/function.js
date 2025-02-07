import { sendEmail } from "@/actions/send-email";
import { db } from "../prisma";
import { inngest } from "./client";
import EmailTemplate from "@/emails/template";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const checkBudgetAlert = inngest.createFunction(
  { name: "Check Budget Alert" },
  { cron: "0 */6 * * *" },
  async ({ step }) => {
    const budgets = await step.run("fetch-budget", async () => {
      return await db.budget.findMany({
        include: {
          user: {
            include: {
              accounts: {
                where: {
                  isDefault: true,
                },
              },
            },
          },
        },
      });
    });
    // chchkn if expns excds budgt thn sedn ml

    for (const budget of budgets) {
      const defaultAccount = budget.user.accounts[0];
      if (!defaultAccount) continue; // Skip if no default account

      await step.run(`check-budget-${budget.id}`, async () => {
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

        // calc all expns using aggrgrte func
        const expenses = await db.transaction.aggregate({
          where: {
            userId: budget.userId,
            accountId: defaultAccount.id, // Only consider default account
            type: "EXPENSE",
            date: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
          },
          _sum: {
            amount: true,
          },
        });
        const totalExpenses = expenses._sum.amount?.toNumber() || 0;
        const budgetAmount = budget.amount;
        const percentageUsed = (totalExpenses / budgetAmount) * 100;

        if (
          percentageUsed >= 80 &&
          (!budget.lastAlertSent ||
            isNewMonth(new Date(budget.lastAlertSent), new Date()))
        ) {
          // Send email alert

          await sendEmail({
            to: budget.user.email,
            subject: `Budget Alert for ${defaultAccount.name}`,
            react: EmailTemplate({
              userName: budget.user.name,
              type: "budget-alert",
              data: {
                percentageUsed,
                budgetAmount: parseInt(budgetAmount).toFixed(1),
                totalExpenses: parseInt(totalExpenses).toFixed(1),
                accountName: defaultAccount.name,
              },
            }),
          });

          //update lastalert

          await db.budget.update({
            where: {
              id: budget.id,
            },
            data: {
              lastAlertSent: new Date(),
            },
          });
        }
      });
    }
  }
);

function isNewMonth(lastAlertDate, currentDate) {
  return (
    lastAlertDate.getMonth() !== currentDate.getMonth() ||
    lastAlertDate.getFullYear() !== currentDate.getFullYear()
  );
}

// adding new subs or next transaction if its recurring

// export const triggerRecurringTransactions = inngest.createFunction(
//   {
//     id: "trigger-recurring-transactions",
//     name: "Trigger-Recurring-Transactions",
//   },
//   { cron: "0 0 * * * " },
//   async ({ step }) => {
//     // fetchrecrng trnsction
//     const recurringTransactions = await step.run(
//       "fetch-recurring-transactions",
//       async () => {
//         return await db.transaction.findMany({
//           where: {
//             isRecurring: true,
//             status: "COMPLETED",
//             OR: [
//               { lastProcessed: null },
//               { nextRecurringDate: { lte: new Date() } },
//             ],
//           },
//         });
//       }
//     );
//     //events for each transaction creating
//     if (recurringTransactions.length > 0) {
//       const events = recurringTransactions.map((transaction) => ({
//         name: "transaction.recurring.process",
//         data: { transactionId: transaction.id, userId: transaction.userId },
//       }));
//       // send events to injest to nb proxcessed
//       await inngest.send(events);
//     }
//     return { triggered: recurringTransactions.length };
//   }
// );

// // to trigger abv events for each transactoon crating

// export const processRecurringTransaction = inngest.createFunction(
//   {
//     id: "process-recurring-transaction",
//     throttle: {
//       limit: 10, //only 10 trnsc
//       period: "1m", //pe min
//       key: "event.data.userId", //per user
//     },
//   },
//   { event: "transaction.recurring.process" },
//   async ({ event, step }) => {
//     //validate event datya
//     if (!event?.data?.transactionId || !event?.data?.userId) {
//       console.error("Invalid event data:", event);
//       return { error: "Missing requyired Event" };
//     }
//     await step.run("process-transaction", async () => {
//       const transaction = await db.transaction.findUnique({
//         where: {
//           id: event.data.transactionId,
//           userId: event.data.userId,
//         },
//         include: {
//           amount: true,
//         },
//       });
//       if (!transaction || !isTransactionDue(transaction)) return;

//       await db.$transaction(async (tx) => {
//         //cretin transactioon
//         await tx.transaction.create({
//           data: {
//             type: transaction.type,
//             amount: transaction.amount,
//             description: `${transaction.description} (Recurring)`,
//             date: new Date(),
//             category: transaction.category,
//             userId: transaction.userId,
//             accountId: transaction.accountId,
//             isRecurring: false,
//           },
//         });
//         //update balance
//         const balanceChange =
//           transaction.type === "EXPENSE"
//             ? -transaction.amount.toNumber()
//             : transaction.amount.toNumber();

//         await tx.account.update({
//           where: { id: transaction.accountId },
//           data: { balance: { increment: balanceChange } },
//         });

//         //upd last processed date
//         await tx.transaction.update({
//           where: { id: transaction.id },
//           data: {
//             lastProcessed: new Date(),
//             nextRecurringDate: calculateNextRecurringDate(
//               new Date(),
//               transaction.recurringInterval
//             ),
//           },
//         });
//       });
//     });
//   }
// );

// function isTransactionDue(transaction) {
//   //if no last priocessed due trnsctipn ios due
//   if (!transaction.lastProcessed) return true;

//   const today = new Date();
//   const nextDue = new Date(transaction.nextRecurringDate);

//   //comp with nexrt die date
//   return nextDue <= today;
// }

export const processRecurringTransaction = inngest.createFunction(
  {
    id: "process-recurring-transaction",
    name: "Process Recurring Transaction",
    throttle: {
      limit: 10, // Process 10 transactions
      period: "1m", // per minute
      key: "event.data.userId", // Throttle per user
    },
  },
  { event: "transaction.recurring.process" },
  async ({ event, step }) => {
    // Validate event data
    if (!event?.data?.transactionId || !event?.data?.userId) {
      console.error("Invalid event data:", event);
      return { error: "Missing required event data" };
    }

    await step.run("process-transaction", async () => {
      const transaction = await db.transaction.findUnique({
        where: {
          id: event.data.transactionId,
          userId: event.data.userId,
        },
        include: {
          account: true,
        },
      });

      if (!transaction || !isTransactionDue(transaction)) return;

      // Create new transaction and update account balance in a transaction
      await db.$transaction(async (tx) => {
        // Create new transaction
        await tx.transaction.create({
          data: {
            type: transaction.type,
            amount: transaction.amount,
            description: `${transaction.description} (Recurring)`,
            date: new Date(),
            category: transaction.category,
            userId: transaction.userId,
            accountId: transaction.accountId,
            isRecurring: false,
          },
        });

        // Update account balance
        const balanceChange =
          transaction.type === "EXPENSE"
            ? -transaction.amount.toNumber()
            : transaction.amount.toNumber();

        await tx.account.update({
          where: { id: transaction.accountId },
          data: { balance: { increment: balanceChange } },
        });

        // Update last processed date and next recurring date
        await tx.transaction.update({
          where: { id: transaction.id },
          data: {
            lastProcessed: new Date(),
            nextRecurringDate: calculateNextRecurringDate(
              new Date(),
              transaction.recurringInterval
            ),
          },
        });
      });
    });
  }
);

// Trigger recurring transactions with batching
export const triggerRecurringTransactions = inngest.createFunction(
  {
    id: "trigger-recurring-transactions", // Unique ID,
    name: "Trigger Recurring Transactions",
  },
  { cron: "0 0 * * *" }, // Daily at midnight
  async ({ step }) => {
    const recurringTransactions = await step.run(
      "fetch-recurring-transactions",
      async () => {
        return await db.transaction.findMany({
          where: {
            isRecurring: true,
            status: "COMPLETED",
            OR: [
              { lastProcessed: null },
              {
                nextRecurringDate: {
                  lte: new Date(),
                },
              },
            ],
          },
        });
      }
    );

    // Send event for each recurring transaction in batches
    if (recurringTransactions.length > 0) {
      const events = recurringTransactions.map((transaction) => ({
        name: "transaction.recurring.process",
        data: {
          transactionId: transaction.id,
          userId: transaction.userId,
        },
      }));

      // Send events directly using inngest.send()
      await inngest.send(events);
    }

    return { triggered: recurringTransactions.length };
  }
);

function isTransactionDue(transaction) {
  // If no lastProcessed date, transaction is due
  if (!transaction.lastProcessed) return true;

  const today = new Date();
  const nextDue = new Date(transaction.nextRecurringDate);

  // Compare with nextDue date
  return nextDue <= today;
}

//calc next recring date
function calculateNextRecurringDate(startDate, interval) {
  const date = new Date(startDate);

  switch (interval) {
    case "DAILY":
      date.setDate(date.getDate() + 1);
      break;
    case "WEEKLY":
      date.setDate(date.getDate() + 7);
      break;
    case "MONTHLY":
      date.setMonth(date.getMonth() + 1);
      break;
    case "YEARLY":
      date.setFullYear(date.getFullYear() + 1);
      break;
  }

  return date;
}

//generatibng monthlyreport fuinction

export const generateMonthlyReports = inngest.createFunction(
  {
    id: "generate-monthly-reports",
    name: "Generate Monthly Reports",
  },
  { cron: "0 0 1 * *" }, //first day of each month
  async ({ step }) => {
    const users = await step.run("fetch-users", async () => {
      return await db.user.findMany({
        include: { accounts: true },
      });
    });
    // gen repots for ;ll users
    for (const user of users) {
      await step.run(`generate-report-${user.id}`, async () => {
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);

        const stats = await getMonthlyStats(user.id, lastMonth);
        const monthName = lastMonth.toLocaleString("default", {
          month: "long",
        });

        //gen ai insights
        const insights = await generateFinancialInsights(stats, monthName);

        // after user has insght we  l send them  using mail
        await sendEmail({
          to: user.email,
          subject: `Your Monthly Financial Report - ${monthName}`,
          react: EmailTemplate({
            userName: user.name,
            type: "monthly-report",
            data: {
              stats,
              month: monthName,
              insights,
            },
          }),
        });
      });
    }
    return { processed: users.length };
  }
);

// async function generateFinancialInsights(stats, month) {
//   const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//   const prompt = `
//   Analyze this financial data and provide 3 concise, actionable insights.
//   Focus on spending patterns and practical advice.
//   Keep it friendly and conversational.

//   Financial Data for ${month}:
//   - Total Income: $${stats.totalIncome}
//   - Total Expenses: $${stats.totalExpenses}
//   - Net Income: $${stats.totalIncome - stats.totalExpenses}
//   - Expense Categories: ${Object.entries(stats.byCategory)
//     .map(([category, amount]) => `${category}: $${amount}`)
//     .join(", ")}

//   Format the response as a JSON array of strings, like this:
//   ["insight 1", "insight 2", "insight 3"]
// `;

//   try {
//     const result = await model.generateContent(prompt);
//     const response = result.response;
//     const text = response.text();
//     const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

//     return JSON.parse(cleanedText);
//   } catch (error) {
//     console.error("Error generating insights:", error);
//     return [
//       "Looks like one category is eating up your budget—might want to rein it in!",
//       "Ever thought about setting a budget? Your wallet will thank you.",
//       "Recurring expenses sneaking up on you? Time to spot the leaks!",
//     ];
//   }
// }



async function generateFinancialInsights(stats, month) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    Analyze this financial data and provide 3 concise, actionable insights.
    Focus on spending patterns and practical advice.
    Keep it friendly and conversational.

    Financial Data for ${month}:
    - Total Income: $${stats.totalIncome}
    - Total Expenses: $${stats.totalExpenses}
    - Net Income: $${stats.totalIncome - stats.totalExpenses}
    - Expense Categories: ${Object.entries(stats.byCategory)
      .map(([category, amount]) => `${category}: $${amount}`)
      .join(", ")}

    Format the response as a JSON array of strings, like this:
    ["insight 1", "insight 2", "insight 3"]
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Error generating insights:", error);
    return [
      "Your highest expense category this month might need attention.",
      "Consider setting up a budget for better financial management.",
      "Track your recurring expenses to identify potential savings.",
    ];
  }
}


// const getMonthlyStats = async (userId, month) => {
//   const startDate = new Date(month.getFullYear(), month.getMonth(), 1);
//   const endDate = new Date(month.getFullYear(), month.getMonth() + 1, 0);

//   const transactions = await db.transaction.findMany({
//     where: {
//       userId,
//       date: {
//         gte: startDate,
//         lte: endDate,
//       },
//     },
//   });


async function getMonthlyStats(userId, month) {
  const startDate = new Date(month.getFullYear(), month.getMonth(), 1);
  const endDate = new Date(month.getFullYear(), month.getMonth() + 1, 0);

  const transactions = await db.transaction.findMany({
    where: {
      userId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  return transactions.reduce(
    (stats, t) => {
      const amount = t.amount.toNumber();
      if (t.type === "EXPENSE") {
        stats.totalExpenses += amount;
        stats.byCategory[t.category] =
          (stats.byCategory[t.category] || 0) + amount;
      } else {
        stats.totalIncome += amount;
      }
      return stats;
    },
    {
      totalExpenses: 0,
      totalIncome: 0,
      byCategory: {},
      transactionCount: transactions.length,
    }
  );
}