"use client";

import { updateDefaultAccount } from "@/actions/accounts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import useFetch from "@/hooks/use-fetch";
import { ArrowBigDownDash, TrendingUp } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { toast } from "sonner";

const AccountCard = ({ account }) => {
  const { name, type, balance, id, isDefault } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  // this is respn for upating isdef value
  // prevdef stops page from reloading
  const handleDefaultChange = async (event) => {
    event.preventDefault();

    if (isDefault) {
      toast.warning(
        "Oh, you thought you could skip the default account? Nice try diddy"
      );
      return; //dont alow toglng of def acc
    }
    await updateDefaultFn(id);
  };
  // call dis usfct if updac chnges or upddeflod chnges
  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success(
        "Default account updated. Who knew it could be this effortless?"
      );
    }
  }, [updatedAccount, updateDefaultLoading]);

  // for error now
  useEffect(() => {
    if (error) {
      toast.error(
        error.message ||
          "Well, that didn’t go as expected. Default account not updated."
      );
    }
  }, [error]);
  return (
    <Card className="bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] rounded-3xl shadow-lg hover:shadow-lg transition-shadow duration-300 ease-in-out group relative">
      <Link href={`/account/${id}`}>
        <CardHeader className=" flex flex-row items-center justify-between space-y-0 pb-2 text-blue-700 group-hover:text-slate-900">
          <CardTitle className="text-sm font-medium capitalize">
            {name}
          </CardTitle>
          {/* <CardDescription>Card Description</CardDescription> */}
          {/* swutch to togle isdef  */}
          <Switch
            checked={isDefault}
            onClick={handleDefaultChange}
            disabled={updateDefaultLoading}
          />
        </CardHeader>
        <CardContent>
          {/* convtng strnf to float and decimal to 2nd place  */}
          <div className="text-2xl font-semibold">
          ₹{parseFloat(balance).toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            {type.charAt(0) + type.slice(1).toLowerCase()} Account
          </p>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <TrendingUp className="mr-1 h-4 w-4 text-green-700" />
            Income
          </div>
          <div className="flex items-center">
            <ArrowBigDownDash className="mr-1 h-4 w-4 text-pink-500" />
            Expenses
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default AccountCard;
