"use client";
import { scanReceipt } from "@/actions/transaction";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { IconCameraAi } from "@tabler/icons-react";
import { LoaderPinwheel } from "lucide-react";

import React, { useEffect, useRef } from "react";
import { toast } from "sonner";

const ReciptScanner = ({ onScanComplete }) => {
  const fileInputRef = useRef();
  const {
    loading: scanReceiptLoading,
    fn: scanReceiptFn,
    data: scannedData,
  } = useFetch(scanReceipt);

  const handlReceiptScan = async (file) => {
    if(file.size >  5 * 1024 * 1024) {
      toast.error("File Size has to be <= 5mb 🤬");
      return;
    }

    await scanReceiptFn(file);
  };

  useEffect(() =>{ 
    if(scannedData && !scanReceiptLoading) {
      onScanComplete(scannedData);
      toast.success("Receipt Scanned successfully 🫡")
    }
  },[scanReceiptLoading, scannedData])
  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handlReceiptScan(file);
        }}
      />
      <Button 
      type="button"
      variant = "outline"
      className="w-full h-10 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 animate-gradient hover:opacity-90 transition-opacity text-white hover:text-white"
      onClick={() => fileInputRef.current?.click()}
      disabled={scanReceiptLoading}
      >
        {scanReceiptLoading ? (
          <>
            <LoaderPinwheel className="mr-2 animate-spin" />
            <span>Scanning In Progress</span>
          </>
        ) : (
          <>
            <IconCameraAi className="mr-2" />
            <span>Scan Receipt To See Magic ◌</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default ReciptScanner;
