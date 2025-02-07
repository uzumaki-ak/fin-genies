import { getUserAccounts } from "@/actions/dashboard";
import { TypewriterEffectDemo, TypewriterEffectDemos } from "@/components/TypewriterEffectDemo";
import { defaultCategories } from "@/data/category";
import React from "react";
import AddTransactionForm from "../_components/transaction-form";
import { getTransaction } from "@/actions/transaction";

const AddTransactionPage = async ({ searchParams }) => {
  const accounts = await getUserAccounts();

  const editId = searchParams?.edit;

  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }

  return (
    <div className=" mx-auto px-5 bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
      <div className="  md:justify-normal mb-8">
        <h1 className="mb-8 flex justify-center items-center">
          {editId ? <TypewriterEffectDemos /> : <TypewriterEffectDemo />}
        </h1>
      </div>
      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
    </div>
  );
};

export default AddTransactionPage;
