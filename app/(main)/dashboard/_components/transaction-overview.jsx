"use client";

import {
  Card,
  CardContent,
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
import React, { useEffect, useMemo, useState } from "react";
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

export function DashboardOverview({ accounts = [], transactions = [] }) {
  const defaultAccountId =
    accounts.find((account) => account.isDefault)?.id || accounts[0]?.id || "";

  const [selectedAccountId, setSelectedAccountId] = useState(defaultAccountId);

  useEffect(() => {
    if (!accounts.length) {
      setSelectedAccountId("");
      return;
    }

    const stillExists = accounts.some((account) => account.id === selectedAccountId);
    if (!stillExists) {
      setSelectedAccountId(defaultAccountId);
    }
  }, [accounts, selectedAccountId, defaultAccountId]);

  const accountTransactions = useMemo(
    () => transactions.filter((transaction) => transaction.accountId === selectedAccountId),
    [transactions, selectedAccountId]
  );

  const recentTransactions = useMemo(
    () =>
      [...accountTransactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5),
    [accountTransactions]
  );

  const pieChartData = useMemo(() => {
    const currentDate = new Date();
    const expensesByCategory = accountTransactions
      .filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return (
          transaction.type === "EXPENSE" &&
          transactionDate.getMonth() === currentDate.getMonth() &&
          transactionDate.getFullYear() === currentDate.getFullYear()
        );
      })
      .reduce((acc, transaction) => {
        const category = transaction.category || "Other";
        const amount = Number(transaction.amount || 0);
        acc[category] = (acc[category] || 0) + amount;
        return acc;
      }, {});

    return Object.entries(expensesByCategory).map(([category, amount]) => ({
      name: category,
      value: amount,
    }));
  }, [accountTransactions]);

  if (!accounts.length) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-normal">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="py-4 text-center text-muted-foreground">
              Create an account to start tracking transactions.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Monthly Expense Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="py-4 text-center text-muted-foreground">
              Your expense chart will appear here after transactions are added.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-base font-normal">Recent Transactions</CardTitle>
          <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select account" />
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
              <p className="py-4 text-center text-muted-foreground">No recent transactions</p>
            ) : (
              recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {transaction.description || "Untitled transaction"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(transaction.date), "PP")}
                    </p>
                  </div>
                  <div
                    className={cn(
                      "flex items-center",
                      transaction.type === "EXPENSE" ? "text-rose-500" : "text-emerald-600"
                    )}
                  >
                    {transaction.type === "EXPENSE" ? (
                      <ArrowDown01Icon className="mr-1 h-4 w-4" />
                    ) : (
                      <ArrowUp01Icon className="mr-1 h-4 w-4" />
                    )}
                    Rs {Number(transaction.amount || 0).toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Expense Chart</CardTitle>
        </CardHeader>
        <CardContent className="p-0 pb-5">
          {pieChartData.length === 0 ? (
            <p className="py-4 text-center text-muted-foreground">No expenses this month</p>
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
                    label={({ name, value }) => `${name}: ${Number(value).toFixed(2)}`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
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
