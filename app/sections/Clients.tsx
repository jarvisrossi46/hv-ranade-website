"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const clients = [
  { name: "Client 1", logo: "/clients/client1.jpg" },
  { name: "Client 2", logo: "/clients/client2.jpg" },
  { name: "Client 3", logo: "/clients/client3.jpg" },
  { name: "Client 4", logo: "/clients/client4.jpg" },
  { name: "Client 5", logo: "/clients/client5.jpg" },
  { name: "Client 6", logo: "/clients/client6.jpg" },
  { name: "Client 7", logo: "/clients/client7.jpg" },
  { name: "Client 8", logo: "/clients/client8.jpg" },
  { name: "Client 9", logo: "/clients/client9.jpg" },
  { name: "Client 10", logo: "/clients/client10.jpg" },
  { name: "Client 11", logo: "/clients/client11.jpg" },
  { name: "Client 12", logo: "/clients/client12.jpg" },
  { name: "Client 13", logo: "/clients/client13.jpg" },
  { name: "Client 14", logo: "/clients/client14.jpg" },
  { name: "Client 15", logo: "/clients/client15.jpg" },
  { name: "Client 16", logo: "/clients/client16.jpg" },
  { name: "Client 17", logo: "/clients/client17.jpg" },
  { name: "Client 18", logo: "/clients/client18.jpg" },
];

export default function Clients() {
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
            stagger: 0.05,
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
      id="clients"
      className="relative py-24 md:py-32 bg-[#0f2744] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a365d] via-[#0f2744] to-[#1a365d]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[#d69e2e] text-sm font-semibold tracking-wider uppercase mb-4">
            <div className="w-8 h-[2px] bg-[#d69e2e]" />
            Our Clients
            <div className="w-8 h-[2px] bg-[#d69e2e]" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by Industry
            <span className="gradient-text block">Leaders</span>
          </h2>

          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            We are proud to serve some of the most respected companies across India, providing comprehensive insurance solutions tailored to their needs.
          </p>
        </div>

        {/* Clients Grid */}
        <div ref={cardsRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {clients.map((client, index) => (
            <div
              key={index}
              className="group glass rounded-xl p-3 md:p-4 hover:bg-[#2c5282]/50 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center"
            >
              <img 
                src={client.logo} 
                alt={client.name}
                className="w-full h-12 md:h-16 object-contain filter brightness-90 group-hover:brightness-100 transition-all"
              />
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {[
            { value: "100+", label: "Corporate Clients" },
            { value: "18+", label: "Industry Leaders" },
            { value: "35+", label: "Years of Trust" },
            { value: "99%", label: "Client Retention" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#d69e2e]">{stat.value}</div>
              <div className="text-white/60 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
