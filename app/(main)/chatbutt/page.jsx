"use client";

import { useState } from "react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function Chatbot() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleQuery = async () => {
    setIsLoading(true);
    setResponse(""); // Clear previous response

    try {
      if (query.toLowerCase().includes("total spending last week")) {
        const startOfWeek = new Date();
        startOfWeek.setDate(startOfWeek.getDate() - 7);
        const endOfWeek = new Date();

        const totalSpending = await prisma.transaction.aggregate({
          _sum: {
            amount: true,
          },
          where: {
            type: "EXPENSE",
            date: {
              gte: startOfWeek,
              lte: endOfWeek,
            },
          },
        });

        if (totalSpending._sum.amount === null) {
          setResponse("No transactions found for last week.");
        } else {
          setResponse(`Your total spending last week was ₹${totalSpending._sum.amount}`);
        }
      } else if (query.toLowerCase().includes("total spending last month")) {
        const startOfMonth = new Date();
        startOfMonth.setMonth(startOfMonth.getMonth() - 1);
        const endOfMonth = new Date();

        const totalSpending = await prisma.transaction.aggregate({
          _sum: {
            amount: true,
          },
          where: {
            type: "EXPENSE",
            date: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
          },
        });

        if (totalSpending._sum.amount === null) {
          setResponse("No transactions found for last month.");
        } else {
          setResponse(`Your total spending last month was ₹${totalSpending._sum.amount}`);
        }
      } else if (query.toLowerCase().includes("list all transactions")) {
        const transactions = await prisma.transaction.findMany({
          where: {
            type: "EXPENSE",
          },
          orderBy: {
            date: "desc",
          },
        });

        if (transactions.length === 0) {
          setResponse("No transactions found.");
        } else {
          const transactionList = transactions
            .map((t) => `${t.description}: ₹${t.amount} on ${t.date.toLocaleDateString()}`)
            .join("\n");
          setResponse(`Your transactions:\n${transactionList}`);
        }
      } else {
        setResponse("Sorry, I couldn't understand your query.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse("An error occurred while processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask me something..."
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={handleQuery}
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isLoading ? "Processing..." : "Send"}
      </button>
      {response && (
        <div className="mt-4 p-4 bg-white rounded">
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}