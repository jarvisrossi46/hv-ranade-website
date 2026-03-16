"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Heart, Car, Home, Flame, ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const floatingIcons = [
  { Icon: Shield, x: "10%", y: "20%", size: 80, delay: 0 },
  { Icon: Heart, x: "85%", y: "15%", size: 60, delay: 0.5 },
  { Icon: Car, x: "75%", y: "70%", size: 70, delay: 1 },
  { Icon: Home, x: "15%", y: "75%", size: 65, delay: 1.5 },
  { Icon: Flame, x: "50%", y: "85%", size: 55, delay: 2 },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: "power3.out" }
      );

      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 1.1, ease: "power3.out" }
      );

      // Parallax on scroll
      gsap.to(titleRef.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1a365d]"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a365d] via-[#1a365d] to-[#2c5282]" />

      {/* Floating icons */}
      {floatingIcons.map(({ Icon, x, y, size, delay }, index) => (
        <div
          key={index}
          className="absolute pointer-events-none"
          style={{
            left: x,
            top: y,
            animation: `float 6s ease-in-out infinite`,
            animationDelay: `${delay}s`,
          }}
        >
          <Icon
            className="text-[#d69e2e]/20"
            style={{ width: size, height: size }}
            strokeWidth={1}
          />
        </div>
      ))}

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(214, 158, 46, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(214, 158, 46, 0.3) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-[#d69e2e]/10 border border-[#d69e2e]/30 rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 bg-[#d69e2e] rounded-full animate-pulse" />
          <span className="text-[#d69e2e] text-sm font-medium">35+ Years of Excellence</span>
        </div>

        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
        >
          Protecting What
          <br />
          <span className="gradient-text">Matters Most</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10"
        >
          H.V. Ranade & Associates provides comprehensive insurance solutions
          for life, health, property, and business. Your trusted partner since 1989.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => scrollToSection("#contact")}
            className="bg-[#d69e2e] text-[#1a365d] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#ecc94b] transition-all duration-300 hover:scale-105 animate-pulse-glow"
          >
            Get a Quote
          </button>
          <button
            onClick={() => scrollToSection("#services")}
            className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:border-[#d69e2e] hover:text-[#d69e2e] transition-all duration-300"
          >
            Our Services
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: "35+", label: "Years Experience" },
            { value: "10+", label: "Insurance Products" },
            { value: "1000+", label: "Happy Clients" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#d69e2e]">{stat.value}</div>
              <div className="text-xs md:text-sm text-white/60 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button
          onClick={() => scrollToSection("#about")}
          className="text-white/50 hover:text-[#d69e2e] transition-colors"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
}
