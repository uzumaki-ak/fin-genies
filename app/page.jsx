import { AnimatedBeamMultipleOutputDemo } from "@/components/animated-beam-demo";
import { AnimatedTestimonialsDemo } from "@/components/animated-testimonials-demo";
import { BackgroundBoxesDemo } from "@/components/background-boxes-demo";
import BoxRevealDemo from "@/components/box-reveal-demo";

import HeroSection from "@/components/hero";
import { ScrollBasedVelocityDemo } from "@/components/scroll-based-velocity-demo";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { Card, CardContent } from "@/components/ui/card";
import { WordRotateDemo } from "@/components/word-rotate-demo";
import { featuresData, howItWorksData, statsData } from "@/data/landing";
import Image from "next/image";

// import { Element } from "react-scroll";

export default function Home() {
  return (
    <div className="mt-40">
      <HeroSection />

      <section className="py-20 h-full w-full bg-sky-100 rounded-3xl bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-orange-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-black">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section name="services">
        <div className="md:px-0 mx-6 py-6 xl:w-4/5 2xl:w-[68%] md:mx-auto ">
          <h1 className="">
            <WordRotateDemo />
          </h1>
        </div>
      </section>
      {/* features sex  */}
      <section
        id="features"
        className="py-6 bg-zinc-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] rounded-[67px]"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Everything you need to manage your finances
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8">
            {featuresData.map((feature, index) => (
              <Card
                className="p-6 bg-slate-900 text-yellow-300 rounded-2xl"
                key={index}
              >
                <CardContent className="space-y-4 pt-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold ">{feature.title}</h3>
                  <p className="text-gray-100">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* scrollingpagevelocty */}
      <section className="py-20">
        <ScrollBasedVelocityDemo />
      </section>
      {/* process diag  */}
      <section name="process">
        <main className="md:px-0 mx-6 md:mx-auto mb-7">
          <h1 className="text-3xl md:text-5xl md:text-center font-medium flex items-center gap-x-2 mx-auto justify-center">
            Our{" "}
            <span className="text-blue-500 flex gap-x-1 items-center">
              {" "}
              <Image
                src={"/squiggle.svg"}
                width={10000}
                height={10000}
                className="w-6"
                alt="image"
              />
              Creative
              <Image
                src={"/star (1).svg"}
                width={10000}
                height={10000}
                className="w-6 mb-8"
                alt="image"
              />
            </span>{" "}
            Process
          </h1>
          <p className="text-center py-4 md:w-1/2 mx-auto text-xl text-gray-800">
            Gain clarity and control over your finances with our AI-driven
            solutions. We help you make better decisions, one expense at a time
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center w-full md:w-1/2 mx-auto">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <AnimatedBeamMultipleOutputDemo />
            </div>

            <div className="w-full md:w-1/2 order-1 md:order-2 md:ml-0 ">
              <BoxRevealDemo />
            </div>
          </div>
        </main>
      </section>

      {/* hwo it worka sexton  */}

      <section className="py-20 bg-sky-100 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] rounded-3xl">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16">The Workflow</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {howItWorksData.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div>
          <AnimatedTestimonialsDemo />
        </div>
      </section>
      <section>
        <BackgroundBoxesDemo />
      </section>
    </div>
  );
}
