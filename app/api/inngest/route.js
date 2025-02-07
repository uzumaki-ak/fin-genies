import { inngest } from "@/lib/inngest/client";
import { checkBudgetAlert, generateMonthlyReports, processRecurringTransaction, triggerRecurringTransactions } from "@/lib/inngest/function";

import {serve} from "inngest/next"


// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    /* your functions will be passed here later! */
  checkBudgetAlert,
  triggerRecurringTransactions,
  processRecurringTransaction,
  generateMonthlyReports,
  ],
});
