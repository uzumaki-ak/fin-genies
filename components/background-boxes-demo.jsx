"use client";
import React from "react";
// import { Boxes } from "../ui/background-boxes";
import { Boxes } from "./ui/background-boxes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";

export function BackgroundBoxesDemo() {
  return (
    <div className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col  items-center justify-center rounded-3xl">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <h1 className={cn("md:text-4xl text-xl text-white relative z-20")}>
        Take charge of your financial future—join us today and unlock <br />
        smarter ways to save, invest, and grow your wealth with ease!
      </h1>
      <Link href="/dashboard">
        <Button
          size="lg"
          className="bg-white text-black hover:bg-teal-200 animate-bounce mt-9 rounded-2xl"
        >
          Start your Free Trail
        </Button>
      </Link>
    </div>
  );
}
