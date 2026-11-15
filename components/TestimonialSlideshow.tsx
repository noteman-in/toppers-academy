"use client";

import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

export default function TestimonialSlideshow({ testimonials }: { testimonials: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (!testimonials || testimonials.length === 0) {
    return <p className="text-slate-500 text-center">No testimonials published yet.</p>;
  }

  const current = testimonials[currentIndex];

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="max-w-3xl mx-auto relative px-4 sm:px-12">
      {/* Main Card */}
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-200 text-center relative overflow-hidden">
        {/* Top gold accent line */}
        <div className="absolute top-0 left-0 w-full h-2 bg-brand-accent"></div>

        <div className="flex justify-center gap-1 text-brand-accent mb-6">
          {[...Array(5)].map((_, i) => <Star key={i} className="fill-current w-6 h-6" />)}
        </div>

        <p className="text-slate-700 text-xl md:text-2xl italic mb-8 font-medium leading-relaxed">
          "{current.review}"
        </p>

        <div className="mt-6 border-t border-slate-100 pt-6">
          {/* ONLY Name and Review (No Avatar, No Class) */}
          <h4 className="font-bold text-brand-dark text-2xl">{current.name}</h4>
        </div>
      </div>

      {/* Navigation Arrows (Visible on Desktop) */}
      {testimonials.length > 1 && (
        <>
          <button 
            onClick={prev} 
            className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg border border-slate-100 text-slate-600 hover:text-brand-primary hover:bg-slate-50 transition-all z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={next} 
            className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg border border-slate-100 text-slate-600 hover:text-brand-primary hover:bg-slate-50 transition-all z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Navigation Dots */}
      {testimonials.length > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "bg-brand-primary w-8" : "bg-slate-300 w-2.5 hover:bg-slate-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}