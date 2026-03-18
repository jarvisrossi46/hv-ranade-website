"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const partners = [
  { name: "Partner 1", logo: "/partners/partner1.jpg" },
  { name: "Partner 2", logo: "/partners/partner2.jpg" },
  { name: "Partner 3", logo: "/partners/partner3.jpg" },
  { name: "Partner 4", logo: "/partners/partner4.jpg" },
  { name: "Partner 5", logo: "/partners/partner5.jpg" },
  { name: "Partner 6", logo: "/partners/partner6.jpg" },
  { name: "Partner 7", logo: "/partners/partner7.jpg" },
  { name: "Partner 8", logo: "/partners/partner8.jpg" },
  { name: "Partner 9", logo: "/partners/partner9.jpg" },
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
        <div ref={cardsRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group glass rounded-xl p-4 md:p-6 hover:bg-[#2c5282]/50 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center"
            >
              <img 
                src={partner.logo} 
                alt={partner.name}
                className="w-full h-16 md:h-20 object-contain filter brightness-90 group-hover:brightness-100 transition-all"
              />
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
