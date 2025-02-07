import { z } from "zod";

export const accountSchema = z.object({
  name: z.string().min(1, "Name is Needed"),
  type: z.enum(["CURRENT", "SAVINGS"]),
  balance: z.string().min(1, "Balance is Needed"),
  isDefault: z.boolean().default(false),
});

export const transactionSchema = z.object({
  type: z.enum(["INCOME", "EXPENSE"]),
  amount: z.string().min(1, "Amount is Needed"),
  description: z.string().optional(),
  date: z.date({ required_error: "Seriously ? just input the date dude !" }),
  accountId: z.string().min(1, "Account is Needed"),
  category: z.string().min(1, "Category is also needed :|"),
  isRecurring: z.boolean().default(false),
  recurringInterval: z.enum(["DAILY", "WEEKLY", "YEARLY"]).optional(),
}).superRefine((data, ctx) => {
if(data.isRecurring && !data.recurringInterval){
  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message: "Recurring transactions don't just happen—set a recurrence interval, genius!",
    path: ["recurringInterval"],
  })
}
})
