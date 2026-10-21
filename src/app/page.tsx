import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Process from "@/components/sections/process";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden bg-background">
      <Hero />
      <Services />
      <Work />
      <Process />
      <About />
      <Contact />
    </div>
  );
}