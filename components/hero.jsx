"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { CoverDemo } from "./cover-demo";


const HeroSection = () => {
  // toplaywithimage we use useref

  const imageRef = useRef();

  useEffect(() => {
    const imageElement = imageRef.current;
    // when component mounts, we add event listener to image

    const handleScroll = () => {
      // for curren position
      const scrollPosition = window.scrollY;
      //how much to scroll or to tilt img
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    
    <div className="pb-20 px-4   h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      <div className="container mx-auto text-center ">
        <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title">
        <CoverDemo />
        </h1>
        <p className="text-xl text-zinc-500 font-bold mb-7 max-w-2xl mx-auto">
          An AI-Enhanced Platform to Track, Refine, and Grow Your Financial
          Potential, with unparalleled accuracy and Real-Time Precision !
        </p>
        <div className="flex justify-center space-x-4">
          <Link href={"/dashboard"}>
            <Button size="lg" className="px-8 hover:bg-cyan-300 hover:text-black">
              Get Started
            </Button>
          </Link>
          <Link href={"https://youtu.be/k5Da-dFVdZA?si=hvNur2DPZr9oxy7M"}>
            <Button size="lg" variant="outline" className="px-8 ">
              Watch Demo
            </Button>
          </Link>
        </div>
        <div className="hero-image-wrapper">
          <div ref={imageRef} className="hero-image">
            <Image
              src="/banner2.jpg"
              width={1280}
              height={200}
              alt="Hero sec image"
              className="rounded-lg shadow-2xl border mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;


// "use client";

// import React, { useEffect, useRef } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// const HeroSection = () => {
//   const imageRef = useRef(null);

//   useEffect(() => {
//     const imageElement = imageRef.current;

//     const handleScroll = () => {
//       const scrollPosition = window.scrollY;
//       const scrollThreshold = 100;

//       if (scrollPosition > scrollThreshold) {
//         imageElement.classList.add("scrolled");
//       } else {
//         imageElement.classList.remove("scrolled");
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <section className="pt-40 pb-20 px-4">
//       <div className="container mx-auto text-center">
//         <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title">
//           Manage Your Finances <br /> with Intelligence
//         </h1>
//         <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
//           An AI-powered financial management platform that helps you track,
//           analyze, and optimize your spending with real-time insights.
//         </p>
//         <div className="flex justify-center space-x-4">
//           <Link href="/dashboard">
//             <Button size="lg" className="px-8">
//               Get Started
//             </Button>
//           </Link>
//           <Link href="https://www.youtube.com/roadsidecoder">
//             <Button size="lg" variant="outline" className="px-8">
//               Watch Demo
//             </Button>
//           </Link>
//         </div>
//         <div className="hero-image-wrapper mt-5 md:mt-0">
//           <div ref={imageRef} className="hero-image">
//             <Image
//               src="/banner.jpeg"
//               width={1280}
//               height={720}
//               alt="Dashboard Preview"
//               className="rounded-lg shadow-2xl border mx-auto"
//               priority
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;