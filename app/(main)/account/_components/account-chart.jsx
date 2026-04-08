"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { endOfDay, format, startOfDay, subDays } from "date-fns";
import React, { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DATE_RANGES = {
  "7D": { label: "Last 7 Days", days: 7 },
  "1M": { label: "Last Month", days: 30 },
  "3M": { label: "Last 3 Months", days: 90 },
  "6M": { label: "Last 6 Months", days: 180 },
  ALL: { label: "All Time", days: null },
};

const AccountChart = ({ transactions }) => {
  const [dateRange, setDateRange] = useState("1M");

  const filteredData = useMemo(() => {
    const range = DATE_RANGES[dateRange];
    const now = new Date();
    const startDate = range.days
      ? startOfDay(subDays(now, range.days))
      : startOfDay(new Date(0));

    const filteredTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDate && transactionDate <= endOfDay(now);
    });

    const grouped = filteredTransactions.reduce((acc, transaction) => {
      const transactionDate = new Date(transaction.date);
      const dateKey = format(transactionDate, "yyyy-MM-dd");

      if (!acc[dateKey]) {
        acc[dateKey] = {
          dateKey,
          dateLabel: format(transactionDate, "MM dd"),
          income: 0,
          expense: 0,
        };
      }

      if (transaction.type === "INCOME") {
        acc[dateKey].income += Number(transaction.amount);
      } else {
        acc[dateKey].expense += Number(transaction.amount);
      }

      return acc;
    }, {});

    return Object.values(grouped)
      .sort((a, b) => new Date(a.dateKey) - new Date(b.dateKey))
      .map((item) => ({
        date: item.dateLabel,
        income: item.income,
        expense: item.expense,
      }));
  }, [transactions, dateRange]);

  const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, day) => ({
        income: acc.income + day.income,
        expense: acc.expense + day.expense,
      }),
      { income: 0, expense: 0 }
    );
  }, [filteredData]);

  return (
    <Card className="rounded-2xl bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-base font-medium text-foreground">
          Transaction Overview
        </CardTitle>

        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[160px] bg-background text-foreground">
            <SelectValue placeholder="Select Range" />
          </SelectTrigger>
          <SelectContent className="bg-popover text-popover-foreground">
            {Object.entries(DATE_RANGES).map(([key, { label }]) => (
              <SelectItem key={key} value={key} className="text-popover-foreground">
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        <div className="mb-6 flex justify-around text-sm">
          <div className="text-center">
            <p className="text-muted-foreground">Total Income</p>
            <p className="text-lg font-bold text-green-500">Rs {totals.income.toFixed(2)}</p>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground">Total Expenses</p>
            <p className="text-lg font-bold text-pink-500">Rs {totals.expense.toFixed(2)}</p>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground">Net Income</p>
            <p
              className={`text-lg font-bold ${
                totals.income - totals.expense >= 0 ? "text-green-500" : "text-pink-500"
              }`}
            >
              Rs {(totals.income - totals.expense).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={filteredData}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />

              <XAxis
                dataKey="date"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />

              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(value) => `Rs ${value}`}
              />

              <Tooltip
                formatter={(value) => [`Rs ${Number(value).toFixed(2)}`, undefined]}
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  color: "hsl(var(--popover-foreground))",
                  borderRadius: "var(--radius)",
                }}
              />

              <Legend
                formatter={(value) => (
                  <span style={{ color: "hsl(var(--foreground))" }}>{value}</span>
                )}
              />

              <Bar dataKey="income" name="Income" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountChart;
