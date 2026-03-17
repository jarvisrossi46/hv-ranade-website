"use client";

import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Floating Navigation */}
      <nav
        className={`fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4 transition-all duration-500 ${
          scrolled ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {navItems.map((item) => (
          <button
            key={item.href}
            onClick={() => scrollToSection(item.href)}
            className="group relative flex items-center justify-end"
          >
            <span className="absolute right-10 bg-[#1a365d] text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-[#d69e2e]/30">
              {item.label}
            </span>
            <div className="w-3 h-3 rounded-full bg-[#d69e2e]/30 group-hover:bg-[#d69e2e] transition-all duration-300 group-hover:scale-125" />
          </button>
        ))}
      </nav>

      {/* Mobile Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? "bg-[#1a365d]/90 backdrop-blur-md py-4" : "py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="H.V. Ranade & Associates" 
              className="h-24 w-auto object-contain"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-white/80 hover:text-[#d69e2e] text-sm font-medium transition-colors"
              >
                {item.label}
              </button>
            ))}
            <a
              href="tel:+919822012345"
              className="flex items-center gap-2 bg-[#d69e2e] text-[#1a365d] px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#ecc94b] transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[#1a365d]/95 backdrop-blur-md border-t border-[#d69e2e]/20">
            <div className="px-6 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-white/80 hover:text-[#d69e2e] text-left py-2 transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="tel:+919822012345"
                className="flex items-center justify-center gap-2 bg-[#d69e2e] text-[#1a365d] px-4 py-3 rounded-full font-semibold mt-2"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
