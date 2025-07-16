'use client'
import Image from "next/image";
import Hero from "./Client Components/Home/Hero";
import Features from "./Client Components/Home/Features";
import HowItWorks from "./Client Components/Home/HowItWorks";
import TopPodcasts from "./Client Components/Home/TopPodcasts";
import CTASection from "./Client Components/Home/CTASection";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-black">
      <Hero />
      <div className="w-[96vw] mx-auto py-12">
        <Features />
        <HowItWorks />
        <TopPodcasts />
        <CTASection />
      </div>

    </div>
  );
}
