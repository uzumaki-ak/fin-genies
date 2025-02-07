"use client";

import { TypewriterEffect } from "./ui/typewriter-effect";

export function TypewriterEffectDemo() {
  const words = [
    {
      text: "Start- ",
    },
    {
      text: "Adding- ",
    },
    {
      text: " Transactions!",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className=" tracking-widest">
      <TypewriterEffect words={words} />
      <p className="text-neutral-600 dark:text-gray-100 text-base mt-2 text-muted-foreground flex items-center justify-center mb-5">
        "The road to Financial freedom starts here—ditch the notebook, track
        expenses online with AI!"
      </p>
    </div>
  );
}
export function TypewriterEffectDemos() {
  const words = [
    {
      text: "Start- ",
      
    },
    {
      text: "Editing- ",
    },
    {
      text: " Transactions!",
      className: "text-red-500 dark:text-red-500",
    },
  ];
  return (
    <div className=" tracking-widest ">
      <TypewriterEffect words={words} />
      <p className="text-neutral-600 dark:text-gray-100 text-base mt-2 text-muted-foreground flex items-center justify-center mb-5">
        "Take control of your finances—swap spreadsheets for smart AI expense
        tracking and watch your savings grow!"
      </p>
    </div>
  );
}
