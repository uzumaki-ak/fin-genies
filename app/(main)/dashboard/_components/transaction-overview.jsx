// "use client";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { cn } from "@/lib/utils";
// import { format } from "date-fns";
// import { ArrowDown01Icon, ArrowUp01Icon } from "lucide-react";

// import React, { useState } from "react";
// import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

// const COLORS = [
//   "#FF6F61",
//   "#6B5B95",
//   "#88B04B",
//   "#F7CAC9",
//   "#92A8D1",
//   "#955251",
//   "#B565A7",
// ];

// export function DashboardOverview({ accounts, transactions }) {
//   const [selectedAccountId, setSelectedAccountId] = useState(
//     accounts.find((a) => a.isDefault)?.id || accounts[0]?.id
//   );
//   // Filter transactions for selected account
//   const accountTransactions = transactions.filter(
//     (t) => t.accountId === selectedAccountId
//   );

//   // Get recent transactions (last 5)
//   const recentTransactions = accountTransactions
//     .sort((a, b) => new Date(b.date) - new Date(a.date))
//     .slice(0, 5);

//   // Calculate balance for selected account
//   const currentDate = new Date();
//   const currentMonthExpenses = accountTransactions.filter((t) => {
//     const transactionDate = new Date(t.date);
//     return (
//       t.type === "EXPENSE" &&
//       transactionDate.getMonth() === currentDate.getMonth() &&
//       transactionDate.getFullYear() === currentDate.getFullYear()
//     );
//   });

//   //group expensesby by category
//   const expensesByCategory = currentMonthExpenses.reduce((acc, transaction) => {
//     const category = transaction.category;
//     if (!acc[category]) {
//       acc[category] = 0;
//     }
//     acc[category] += transaction.amount;
//     return acc;
//   }, {});

//   // data for pie
//   const pieChartData = Object.entries(expensesByCategory).map(
//     ([category, amount]) => ({
//       name: category,
//       value: amount,
//     })
//   );

//   return (
//     <div className="grid gap-4 md:grid-cols-2">
//       {/* for recnt transc  */}
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
//           <CardTitle className="text-base font-normal">
//             Recent Transactions
//           </CardTitle>
//           <Select
//             value={selectedAccountId}
//             onValueChange={setSelectedAccountId}
//           >
//             <SelectTrigger className="w-[140px]">
//               <SelectValue placeholder="Select Acc" />
//             </SelectTrigger>
//             <SelectContent>
//               {accounts.map((account) => (
//                 <SelectItem key={account.id} value={account.id}>
//                   {account.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {recentTransactions.length === 0 ? (
//               <p className="text-center text-muted-foreground py-4">
//                 No Recent Transactioons
//               </p>
//             ) : (
//               recentTransactions.map((transaction) => {
//                 return (
//                   <div
//                     key={transaction.id}
//                     className="flex items-center justify-between"
//                   >
//                     <div className="space-y-1 ">
//                       <p className="texxt-sm font-medium leading-none">
//                         {transaction.description || "Untitled Transaction"}
//                       </p>
//                       <p className="text-sm text-muted-foreground">
//                         {format(new Date(transaction.date), "PP")}
//                       </p>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <div
//                         className={cn(
//                           "flex items-center",
//                           transaction.type === "EXPENSE"
//                             ? "text-rose-500"
//                             : "text-emerald-600"
//                         )}
//                       >
//                         {transaction.type === "EXPENSE" ? (
//                           <ArrowDown01Icon className="mr-1 h-4 w-4" />
//                         ) : (
//                           <ArrowUp01Icon className="mr-1 h-4 w-4" />
//                         )}
//                         ${transaction.amount.toFixed(2)}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         </CardContent>
//       </Card>

//       {/* for chart  */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Monthly Expense Chart</CardTitle>
//         </CardHeader>
//         <CardContent className="p-0 pb-5">
//           {pieChartData.length === 0 ? (
//             <p className="text-center text-muted-foreground py-4">
//               No Expense Dis Month
//             </p>
//           ) : (
//             <div className="h-[300px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={pieChartData}
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={80}
//                     fill="#8884d8"
//                     darkKey="value"
//                     label={({ name, value }) => `${name}: ${value.toFixed(2)}`}
//                   >
//                     {pieChartData.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={COLORS[index % COLORS.length]}
//                       />
//                     ))}
//                   </Pie>
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// new code

"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowDown01Icon, ArrowUp01Icon } from "lucide-react";

import React, { useState, useEffect } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

const COLORS = [
  "#FF6F61",
  "#6B5B95",
  "#88B04B",
  "#F7CAC9",
  "#92A8D1",
  "#955251",
  "#B565A7",
];

export function DashboardOverview({ accounts, transactions }) {
  const [selectedAccountId, setSelectedAccountId] = useState(
    accounts.find((a) => a.isDefault)?.id || accounts[0]?.id
  );

  // Filter transactions for selected account
  const accountTransactions = transactions.filter(
    (t) => t.accountId === selectedAccountId
  );

  // Get recent transactions (last 5)
  const recentTransactions = accountTransactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // Calculate balance for selected account
  const currentDate = new Date();
  const currentMonthExpenses = accountTransactions.filter((t) => {
    const transactionDate = new Date(t.date);
    return (
      t.type === "EXPENSE" &&
      transactionDate.getMonth() === currentDate.getMonth() &&
      transactionDate.getFullYear() === currentDate.getFullYear()
    );
  });

  // Group expenses by category
  const expensesByCategory = currentMonthExpenses.reduce((acc, transaction) => {
    const category = transaction.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += transaction.amount;
    return acc;
  }, {});

  // Data for pie chart
  const pieChartData = Object.entries(expensesByCategory).map(
    ([category, amount]) => ({
      name: category,
      value: amount,
    })
  );

  // Debugging logs
  useEffect(() => {
    console.log("Selected Account ID:", selectedAccountId);
    console.log("Account Transactions:", accountTransactions);
    console.log("Recent Transactions:", recentTransactions);
    console.log("Current Month Expenses:", currentMonthExpenses);
    console.log("Pie Chart Data:", pieChartData);
  }, [
    selectedAccountId,
    accountTransactions,
    recentTransactions,
    currentMonthExpenses,
    pieChartData,
  ]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Recent Transactions Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-base font-normal">
            Recent Transactions
          </CardTitle>
          <Select
            value={selectedAccountId}
            onValueChange={setSelectedAccountId}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select Acc" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  {account.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No Recent Transactions
              </p>
            ) : (
              recentTransactions.map((transaction) => {
                return (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {transaction.description || "Untitled Transaction"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(transaction.date), "PP")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "flex items-center",
                          transaction.type === "EXPENSE"
                            ? "text-rose-500"
                            : "text-emerald-600"
                        )}
                      >
                        {transaction.type === "EXPENSE" ? (
                          <ArrowDown01Icon className="mr-1 h-4 w-4" />
                        ) : (
                          <ArrowUp01Icon className="mr-1 h-4 w-4" />
                        )}
                        ₹{transaction.amount.toFixed(2)}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Expense Chart Card */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Expense Chart</CardTitle>
        </CardHeader>
        <CardContent className="p-0 pb-5">
          {pieChartData.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No Expenses This Month
            </p>
          ) : (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value.toFixed(2)}`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
