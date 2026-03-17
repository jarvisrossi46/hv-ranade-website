"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const partners = [
  { name: "HDFC ERGO", color: "#004C8F" },
  { name: "ICICI Lombard", color: "#C41230" },
  { name: "Bajaj Allianz", color: "#003399" },
  { name: "TATA AIG", color: "#007CC2" },
  { name: "New India Assurance", color: "#1E4D8C" },
  { name: "United India Insurance", color: "#0066B3" },
  { name: "Oriental Insurance", color: "#0066CC" },
  { name: "National Insurance", color: "#003D7A" },
  { name: "SBI General Insurance", color: "#0066B3" },
  { name: "Reliance General Insurance", color: "#E31837" },
  { name: "Future Generali", color: "#ED1C24" },
  { name: "IFFCO Tokio", color: "#0066B3" },
];

export default function Partners() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="partners"
      className="relative py-24 md:py-32 bg-[#1a365d] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f2744] via-[#1a365d] to-[#0f2744]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[#d69e2e] text-sm font-semibold tracking-wider uppercase mb-4">
            <div className="w-8 h-[2px] bg-[#d69e2e]" />
            Our Partners
            <div className="w-8 h-[2px] bg-[#d69e2e]" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by Leading
            <span className="gradient-text block">Insurance Providers</span>
          </h2>

          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            We partner with India&apos;s top insurance companies to bring you the best coverage options at competitive rates.
          </p>
        </div>

        {/* Partners Grid */}
        <div ref={cardsRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group glass rounded-xl p-4 md:p-6 hover:bg-[#2c5282]/50 transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <div 
                className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 rounded-lg flex items-center justify-center text-white font-bold text-xs md:text-sm"
                style={{ backgroundColor: partner.color }}
              >
                {partner.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </div>
              <h3 className="text-white text-xs md:text-sm font-medium leading-tight">
                {partner.name}
              </h3>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-white/60 mb-4">
            Compare plans from all major insurers
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#d69e2e] text-[#1a365d] px-8 py-4 rounded-full font-semibold hover:bg-[#ecc94b] transition-all duration-300 hover:scale-105"
          >
            Get a Quote
          </a>
        </div>
      </div>
    </section>
  );
}
