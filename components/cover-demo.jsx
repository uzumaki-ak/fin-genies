import React from "react";
// import { Cover } from "@/components/ui/cover";

import { Cover } from "./ui/cover";

export function CoverDemo() {
  return (
    <div>
      <h1
        className="text-3xl md:text-6xl lg:text-7xl font-semibold max-w-7xl
         mx-auto text-center relative z-20 bg-clip-text text-transparent 
         bg-gradient-to-b from-neutral-800 via-neutral-700
          to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white"
      >
        Track, Save, Grow  <br /> Smarter <Cover>Finances with AI</Cover>
      </h1>
    </div>
  );
}

<br />
         