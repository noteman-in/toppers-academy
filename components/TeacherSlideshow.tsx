"use client";

import { useState, useEffect } from "react";

const images = [
  "/images/vikrant-hero.png", 
  "/images/vikrant-hero2.png", 
  "/images/vikrant-hero3.png", 
];

export default function TeacherSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full">
      {/* Floating Badge */}
      <div className="absolute -top-6 -right-6 bg-gradient-to-br from-brand-accent to-yellow-500 p-4 rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.3)] z-30">
        <p className="text-3xl font-extrabold text-white">32+</p>
        <p className="text-xs font-bold text-white/90 uppercase tracking-wider">Years Exp.</p>
      </div>

      {/* Clean Card Wrapper */}
      <div className="relative h-[550px] rounded-3xl overflow-hidden border-2 border-white/10 shadow-xl">
        
        {/* Slideshow Images */}
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Vikrant Ahuja Teaching - Slide ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-[1200ms] ease-in-out ${
              index === currentIndex 
                ? "opacity-100 scale-100" 
                : "opacity-0 scale-105 pointer-events-none"
            }`}
          />
        ))}

        {/* Dark gradient overlay so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/30 to-transparent opacity-90 z-10 pointer-events-none"></div>

        {/* Bottom Text on Image */}
        <div className="absolute bottom-8 left-8 z-20 pointer-events-none">
          <h3 className="text-white text-4xl font-bold mb-2 drop-shadow-lg">Vikrant Ahuja</h3>
          <p className="text-brand-accent font-bold tracking-wider uppercase text-sm drop-shadow-md">Founder & Commerce Expert</p>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 right-8 z-20 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "bg-brand-accent w-8" 
                  : "bg-white/40 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}