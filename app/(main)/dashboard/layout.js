import { SparklesTextDemo } from "@/components/sparkle-text-demo";
import React, { Suspense } from "react";
import { PacmanLoader } from "react-spinners";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <h1 className="m-9">
        <SparklesTextDemo />
      </h1>
      {/* dashboard content */}
      <Suspense
        fallback={
          <PacmanLoader className="mt-4" width={"100%"} color="#9333ea" />
        }
      >
        {children}
      </Suspense>
    </div>
  );
};

export default DashboardLayout;
