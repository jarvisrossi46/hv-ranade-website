"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Services from "./sections/Services";
import WhyChooseUs from "./sections/WhyChooseUs";
import Partners from "./sections/Partners";
import Clients from "./sections/Clients";
import Contact from "./sections/Contact";
import Navigation from "./components/Navigation";
import Loader from "./components/Loader";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && mainRef.current) {
      // Refresh ScrollTrigger after loader
      ScrollTrigger.refresh();
    }
  }, [loading]);

  if (loading) {
    return <Loader />;
  }

  return (
    <main ref={mainRef} className="relative">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Partners />
      <Clients />
      <Contact />
    </main>
  );
}
