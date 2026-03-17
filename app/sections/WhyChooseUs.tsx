"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Phone, Clock, Users, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    icon: Award,
    title: "IRDA Licensed",
    description: "All our advisors are IRDA certified professionals",
  },
  {
    icon: Users,
    title: "Expert Guidance",
    description: "Personalized advice based on your unique requirements",
  },
  {
    icon: Clock,
    title: "Quick Claims",
    description: "Hassle-free claims processing with dedicated support",
  },
  {
    icon: Phone,
    title: "24/7 Support",
    description: "Round-the-clock assistance for emergencies",
  },
];

const benefits = [
  "Compare plans from multiple insurers",
  "Get the best premium rates",
  "Expert claim assistance",
  "Annual policy reviews",
  "Dedicated relationship manager",
  "Digital policy management",
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const [counters, setCounters] = useState({ years: 0, clients: 0, claims: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate counters when section is visible
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        onEnter: () => {
          // Animate years
          gsap.to({}, {
            duration: 2,
            onUpdate: function() {
              setCounters(prev => ({ ...prev, years: Math.round(35 * this.progress()) }));
            }
          });
          // Animate clients
          gsap.to({}, {
            duration: 2,
            delay: 0.2,
            onUpdate: function() {
              setCounters(prev => ({ ...prev, clients: Math.round(1000 * this.progress()) }));
            }
          });
          // Animate claims
          gsap.to({}, {
            duration: 2,
            delay: 0.4,
            onUpdate: function() {
              setCounters(prev => ({ ...prev, claims: Math.round(500 * this.progress()) }));
            }
          });
        },
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="relative py-24 md:py-32 bg-[#1a365d] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#d69e2e]/5 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Stats Counter */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 mb-20">
          {[
            { value: counters.years, suffix: "+", label: "Years Experience" },
            { value: counters.clients, suffix: "+", label: "Happy Clients" },
            { value: counters.claims, suffix: "+", label: "Claims Settled" },
          ].map((stat, index) => (
            <div key={index} className="text-center px-4">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#d69e2e] mb-2 whitespace-nowrap">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-white/60 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 text-[#d69e2e] text-sm font-semibold tracking-wider uppercase mb-4">
              <div className="w-8 h-[2px] bg-[#d69e2e]" />
              Why Choose Us
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Trusted by Thousands
              <span className="gradient-text block">Across Maharashtra</span>
            </h2>

            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              We don&apos;t just sell insurance policies — we build lasting relationships
              based on trust, transparency, and exceptional service.
            </p>

            {/* Benefits List */}
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#d69e2e]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-[#d69e2e]" />
                  </div>
                  <span className="text-white/80 text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-6 hover:bg-[#2c5282]/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-[#d69e2e]/10 rounded-xl flex items-center justify-center mb-4">
                  <reason.icon className="w-6 h-6 text-[#d69e2e]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {reason.title}
                </h3>
                <p className="text-white/60 text-sm">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
