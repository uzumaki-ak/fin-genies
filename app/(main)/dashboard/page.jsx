import { getDashboardData, getUserAccounts } from "@/actions/dashboard";
import { getCurrentBudegt } from "@/actions/budeget";
import CreateAccountDrawer from "@/components/create-account-drawer";
import { Card, CardContent } from "@/components/ui/card";
import { FilePlus2 } from "lucide-react";
import React, { Suspense } from "react";
import AccountCard from "./_components/account-card";
import BudgetProgress from "./_components/budget-progress";
import { DashboardOverview } from "./_components/transaction-overview";

async function DashboardPage() {
  const accounts = await getUserAccounts();
  const defaultAccount = accounts.find((account) => account.isDefault);

  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudegt(defaultAccount.id);
  }

  const transactions = await getDashboardData();

  return (
    <div className="m-7 space-y-8">
      {defaultAccount && (
        <BudgetProgress
          initialBudget={budgetData?.budget}
          currentExpenses={budgetData?.currentExpenses || 0}
        />
      )}

      <Suspense fallback={<div className="text-center">Loading overview...</div>}>
        <DashboardOverview accounts={accounts} transactions={transactions} />
      </Suspense>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CreateAccountDrawer>
          <Card className="cursor-pointer rounded-3xl border-dashed bg-custom-multiply-gradient bg-opacity-20 transition-shadow hover:shadow-md">
            <CardContent className="flex h-full flex-col items-center justify-center pt-5 text-muted-foreground">
              <FilePlus2 className="mb-2 h-10 w-10" />
              <p className="text-sm font-bold text-black">Create New Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>

        {accounts.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
