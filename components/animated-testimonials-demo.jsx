// import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { AnimatedTestimonials } from "./ui/animated-testimonials";



export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Raj Yadav",
      designation: "Product Manager at TechFlow",
      src: "https://media.istockphoto.com/id/1332827275/photo/business-investment-and-ai-artificial-intelligence-data-analysis-technology-businessman-and.jpg?s=1024x1024&w=is&k=20&c=zeYHgTPnJHEiWOH9tAzXgViNVdd_ndAQx01Dgh8vLHQ=",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Koshal Jha",
      designation: "CTO at InnovateSphere",
      src: "https://media.istockphoto.com/id/987627214/photo/brain-headed-businessman.jpg?s=2048x2048&w=is&k=20&c=Btwf4QrDM2vk9JZj0B6O1kD_OqSsnWsghQNL2GENCtc=",
    },
    // {
    //   quote:
    //     "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    //   name: "Emily Watson",
    //   designation: "Operations Director at CloudScale",
    //   src: "https://media.istockphoto.com/id/1332827275/photo/business-investment-and-ai-artificial-intelligence-data-analysis-technology-businessman-and.jpg?s=1024x1024&w=is&k=20&c=zeYHgTPnJHEiWOH9tAzXgViNVdd_ndAQx01Dgh8vLHQ=",
    // },
    // {
    //   quote:
    //     "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
    //   name: "James Kim",
    //   designation: "Engineering Lead at DataPro",
    //   src: "https://media.istockphoto.com/id/1332827275/photo/business-investment-and-ai-artificial-intelligence-data-analysis-technology-businessman-and.jpg?s=1024x1024&w=is&k=20&c=zeYHgTPnJHEiWOH9tAzXgViNVdd_ndAQx01Dgh8vLHQ=",
    // },
    // {
    //   quote:
    //     "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
    //   name: "Lisa Thompson",
    //   designation: "VP of Technology at FutureNet",
    //   src: "https://media.istockphoto.com/id/1332827275/photo/business-investment-and-ai-artificial-intelligence-data-analysis-technology-businessman-and.jpg?s=1024x1024&w=is&k=20&c=zeYHgTPnJHEiWOH9tAzXgViNVdd_ndAQx01Dgh8vLHQ=",
    // },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
