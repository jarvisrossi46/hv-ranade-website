"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Users, Clock, Shield } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Award,
    title: "Licensed Experts",
    description: "IRDA licensed professionals with deep industry knowledge",
  },
  {
    icon: Users,
    title: "Personalized Service",
    description: "Tailored insurance solutions for your unique needs",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock assistance for claims and queries",
  },
  {
    icon: Shield,
    title: "Trusted Partners",
    description: "Associated with leading insurance companies in India",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content reveal
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards stagger reveal
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
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

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-32 bg-[#1a365d] overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#d69e2e]/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div ref={contentRef}>
            <div className="inline-flex items-center gap-2 text-[#d69e2e] text-sm font-semibold tracking-wider uppercase mb-4">
              <div className="w-8 h-[2px] bg-[#d69e2e]" />
              About Us
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Your Trusted Insurance
              <span className="gradient-text block">Partner Since 1989</span>
            </h2>

            <p className="text-white/70 text-lg mb-6 leading-relaxed">
              H.V. Ranade & Associates has been serving individuals and businesses
              across Pune and Maharashtra for over three decades. We believe in
              building lasting relationships through honest advice and reliable service.
            </p>

            <p className="text-white/60 mb-8 leading-relaxed">
              Our team of IRDA-licensed professionals works with leading insurance
              providers to offer you comprehensive coverage options at competitive
              rates. Whether you need personal protection or business coverage,
              we have the expertise to guide you.
            </p>

            {/* Founder Card */}
            <div className="glass rounded-2xl p-6 mb-8 border border-[#d69e2e]/20">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#d69e2e] ring-4 ring-[#d69e2e]/20">
                    <img 
                      src="/founder.jpg" 
                      alt="H.V. Ranade - Founder" 
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#d69e2e] rounded-full flex items-center justify-center">
                    <span className="text-[#1a365d] text-xs font-bold">35+</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">H.V. Ranade</h4>
                  <p className="text-[#d69e2e] text-sm">Founder & Principal Advisor</p>
                  <p className="text-white/50 text-xs mt-1">Leading with integrity since 1989</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="glass rounded-xl px-6 py-4">
                <div className="text-3xl font-bold text-[#d69e2e]">35+</div>
                <div className="text-white/60 text-sm">Years Experience</div>
              </div>
              <div className="glass rounded-xl px-6 py-4">
                <div className="text-3xl font-bold text-[#d69e2e]">10+</div>
                <div className="text-white/60 text-sm">Insurance Partners</div>
              </div>
              <div className="glass rounded-xl px-6 py-4">
                <div className="text-3xl font-bold text-[#d69e2e]">1000+</div>
                <div className="text-white/60 text-sm">Clients Served</div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div ref={cardsRef} className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group glass rounded-2xl p-6 hover:bg-[#2c5282]/50 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-14 h-14 bg-[#d69e2e]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#d69e2e]/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-[#d69e2e]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
