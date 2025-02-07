import { getDashboardData, getUserAccounts } from "@/actions/dashboard";
import CreateAccountDrawer from "@/components/create-account-drawer";
import { Card, CardContent } from "@/components/ui/card";
import { FilePlus2 } from "lucide-react";
import React, { Suspense } from "react";
import AccountCard from "./_components/account-card";
import { getCurrentBudegt } from "@/actions/budeget";
import BudgetProgress from "./_components/budget-progress";
import { DashboardOverview } from "./_components/transaction-overview";


async function DashboardPage() {
  const accounts = await getUserAccounts();

  // fetching budgetacc or data from bud.js

  const defaultAccount = accounts?.find((account) => account.isDefault);
  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudegt(defaultAccount.id);
  }

  // fetchin data for dashbord
  const transactions = await getDashboardData();

  return (
    <div className="space-y-8 m-7 ">
      {/* Budget kitna hua progress  */}

      {defaultAccount && (
        <BudgetProgress
          initialBudget={budgetData?.budget}
          currentExpenses={budgetData?.currentExpenses || 0}
        />
      )}

      {/* overview of dashb  or account */}

      <Suspense fallback={"Loading Overview..."}>
        <DashboardOverview
          accounts={accounts}
          transactions={transactions || []}
        />
      </Suspense>

      {/* accont grid allow create ac show diff ac and all */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CreateAccountDrawer>
          <Card className="bg-custom-multiply-gradient bg-opacity-20 hover:shadow-md rounded-3xl transition-shadow cursor-pointer border-dashed ">
            <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5 ">
              <FilePlus2 className="h-10 w-10 mmb-2" />
              <p className="text-sm text-black font-bold">Create New Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>
        {accounts.length > 0 &&
          accounts?.map((account) => {
            return <AccountCard key={account.id} account={account} />;
          })}
      </div>
    </div>
  );
}

export default DashboardPage;
