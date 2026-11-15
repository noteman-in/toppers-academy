"use client";

import { Star } from "lucide-react";

export default function TestimonialTicker({ testimonials }: { testimonials: any[] }) {
  if (!testimonials || testimonials.length === 0) {
    return <p className="text-slate-500 text-center">No testimonials published yet.</p>;
  }

  // We duplicate the array to create a seamless infinite loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Gradient Overlays for smooth fade on edges */}
      <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[#F4F6F9] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#F4F6F9] to-transparent z-10 pointer-events-none"></div>

      {/* The scrolling track */}
      <div className="flex gap-6 w-max animate-marquee py-8">
        {duplicatedTestimonials.map((t, index) => (
          <div 
            key={`${t.id}-${index}`} 
            className="w-[350px] md:w-[450px] shrink-0 bg-white p-8 rounded-3xl shadow-lg border border-slate-200 relative"
          >
            <div className="flex gap-1 text-brand-accent mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="fill-current w-5 h-5" />)}
            </div>
            
            <p className="text-slate-700 text-lg italic mb-6 line-clamp-4">
              "{t.review}"
            </p>
            
            <div className="border-t border-slate-100 pt-4 mt-auto">
              <h4 className="font-bold text-brand-dark text-xl">{t.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}