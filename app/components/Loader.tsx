"use client";

import { useEffect, useState } from "react";
import { Shield, Heart, Car, Home, Flame, Anchor, Wrench, Scale, Factory, TrendingUp } from "lucide-react";

const icons = [
  { Icon: Shield, delay: 0 },
  { Icon: Heart, delay: 0.5 },
  { Icon: Car, delay: 1 },
  { Icon: Home, delay: 1.5 },
  { Icon: Flame, delay: 2 },
  { Icon: Anchor, delay: 2.5 },
  { Icon: Wrench, delay: 3 },
  { Icon: Scale, delay: 3.5 },
  { Icon: Factory, delay: 4 },
  { Icon: TrendingUp, delay: 4.5 },
];

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#1a365d] z-50 flex flex-col items-center justify-center">
      <div className="relative">
        {/* Animated icons circle */}
        <div className="w-40 h-40 md:w-56 md:h-56 relative">
          {icons.map(({ Icon, delay }, index) => (
            <div
              key={index}
              className="absolute w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
              style={{
                top: `${50 + 32 * Math.sin((index * 36 * Math.PI) / 180)}%`,
                left: `${50 + 32 * Math.cos((index * 36 * Math.PI) / 180)}%`,
                transform: "translate(-50%, -50%)",
                animation: `fade-in 0.5s ease-out ${delay}s forwards`,
                opacity: 0,
              }}
            >
              <Icon className="w-5 h-5 md:w-6 md:h-6 text-[#d69e2e]" />
            </div>
          ))}
          
          {/* Center logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="H.V. Ranade & Associates" 
              className="w-28 md:w-48 h-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-12 w-64 h-1 bg-[#2c5282] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#d69e2e] to-[#ecc94b] transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-4 text-[#ecc94b] text-sm tracking-widest animate-pulse">
        {progress < 100 ? "LOADING..." : "WELCOME"}
      </p>
    </div>
  );
}
