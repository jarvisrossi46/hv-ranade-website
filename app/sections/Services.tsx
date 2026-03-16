"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Shield,
  Heart,
  Car,
  Home,
  Flame,
  Anchor,
  Wrench,
  Scale,
  Factory,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Shield,
    title: "Life Insurance",
    description: "Secure your family's future with comprehensive life coverage plans tailored to your needs.",
    color: "#d69e2e",
  },
  {
    icon: Heart,
    title: "Health Insurance",
    description: "Protect yourself and your loved ones with medical coverage for unexpected health expenses.",
    color: "#48bb78",
  },
  {
    icon: Car,
    title: "Vehicle Insurance",
    description: "Complete protection for your cars, bikes, and commercial vehicles against accidents and theft.",
    color: "#4299e1",
  },
  {
    icon: Home,
    title: "Home Insurance",
    description: "Safeguard your home and belongings against natural disasters, theft, and accidents.",
    color: "#ed8936",
  },
  {
    icon: Flame,
    title: "Fire Insurance",
    description: "Protect your property and assets from fire-related damages and losses.",
    color: "#f56565",
  },
  {
    icon: Anchor,
    title: "Marine Insurance",
    description: "Coverage for cargo, vessels, and goods during transit by sea, air, or land.",
    color: "#38b2ac",
  },
  {
    icon: Wrench,
    title: "Engineering Insurance",
    description: "Specialized coverage for machinery, equipment, and construction projects.",
    color: "#9f7aea",
  },
  {
    icon: Scale,
    title: "Liability Insurance",
    description: "Protection against legal liabilities and third-party claims for businesses.",
    color: "#667eea",
  },
  {
    icon: Factory,
    title: "Industrial Insurance",
    description: "Comprehensive coverage for manufacturing units and industrial operations.",
    color: "#e53e3e",
  },
  {
    icon: TrendingUp,
    title: "Financial Services",
    description: "Investment-linked insurance and financial planning for long-term wealth creation.",
    color: "#38a169",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards stagger animation
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-24 md:py-32 bg-[#1a365d] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a365d] via-[#1e3a5f] to-[#1a365d]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[#d69e2e] text-sm font-semibold tracking-wider uppercase mb-4">
            <div className="w-8 h-[2px] bg-[#d69e2e]" />
            Our Services
            <div className="w-8 h-[2px] bg-[#d69e2e]" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Comprehensive Insurance
            <span className="gradient-text block">Solutions</span>
          </h2>

          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            From personal protection to business coverage, we offer a wide range
            of insurance products to meet all your needs.
          </p>
        </div>

        {/* Services Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group glass rounded-2xl p-6 hover:bg-[#2c5282]/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              onClick={scrollToContact}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${service.color}20` }}
              >
                <service.icon
                  className="w-7 h-7"
                  style={{ color: service.color }}
                />
              </div>

              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#d69e2e] transition-colors">
                {service.title}
              </h3>

              <p className="text-white/60 text-sm leading-relaxed mb-4">
                {service.description}
              </p>

              <div className="flex items-center text-[#d69e2e] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Get Quote
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-white/60 mb-4">
            Not sure which insurance you need?
          </p>
          <button
            onClick={scrollToContact}
            className="bg-[#d69e2e] text-[#1a365d] px-8 py-4 rounded-full font-semibold hover:bg-[#ecc94b] transition-all duration-300 hover:scale-105"
          >
            Talk to an Expert
          </button>
        </div>
      </div>
    </section>
  );
}
