import { getAccountWithTransactions } from "@/actions/accounts";

import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import TransactionTable from "../_components/transaction-table";
import { PacmanLoader } from "react-spinners";
import AccountChart from "../_components/account-chart";

export default async function AccountPage({ params }) {
  const accountData = await getAccountWithTransactions(params.id);

  if (!accountData) {
    notFound();
  }

  // now takng out trnstns and acc from accdata
  const { transactions, ...account } = accountData;

  return (
    <div className="space-y-8 px-5 bg-zinc-50 ">
      <div className="flex gap-4 items-end justify-between">
        <div>
          <h1 className="text-5xl sm:text-6xl  font-extrabold text-transparent bg-gradient-to-r from-blue-900 via-red-500 to-teal-500 bg-clip-text capitalize">
            {account.name}
          </h1>
          <p className="text-muted-foreground">
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()}{" "}
            Account
          </p>
        </div>
        <div>
          <div>₹{parseFloat(account.balance).toFixed(2)}</div>
          <p className="text-sm text-muted-foreground">
            {account._count.transactions} Transactions
          </p>
        </div>
      </div>
      {/* chart hain ye yha se  */}

    {/* transactions table hain ye yha se  */}
    <Suspense
        fallback={
          <PacmanLoader
            className="mt-4 justify-items-center"
            width={"100%"}
            color="#9333ea"
          />
        }
      >
       <AccountChart transactions={transactions} />
      </Suspense>


      {/* transactions table hain ye yha se  */}
      <Suspense
        fallback={
          <PacmanLoader
            className="mt-4 justify-items-center"
            width={"100%"}
            color="#9333ea"
          />
        }
      >
        <TransactionTable transactions={transactions} />
      </Suspense>
    </div>
  );
}
