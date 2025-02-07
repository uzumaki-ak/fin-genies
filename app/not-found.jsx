// import React from 'react'

// const NotFound = () => {
//   return (
//     <div className='flex flex-col items-center justify-center max-h-[100vh] px-4 text-center'>
//       <h1 className='text-6xl font-bold mb-4 text-rose-800'>Oops ! <span>this is aw</span></h1>
//     </div>
//   )
// }

// export default NotFound

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] px-4 text-center">
      <div className="text-5xl text-red-600 font-bold ">
        Oops <span className="text-slate-900 font-semibold text-3xl">This is Awkward...You are looking <br />for Something that Doesn't Actually Exists</span>
      </div>

      {/* <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2> */}
      <div className="group relative overflow-hidden">
        <Image
          src="/404.jpg"
          alt="404"
          width={100}
          height={60}
          className="w-52 h-52 ransform transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-3 mt-7"
        />
      </div>
      {/* <p className="text-gray-600 mb-8">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been
        moved.
      </p> */}
      <Link href="/">
        <Button  className="mt-7 w-52 h-10 hover:gradient-title">Go Back Friend ! Go Back</Button>
      </Link>
    </div>
  );
}
