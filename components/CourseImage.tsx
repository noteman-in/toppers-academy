"use client";

import { useState } from "react";
import Image from "next/image";

export default function CourseImage({ src, alt, title }: { src: string, alt: string, title: string }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-brand-dark to-brand-primary/80 flex items-center justify-center p-6 text-center">
        <h3 className="text-white font-extrabold text-2xl leading-tight drop-shadow-md">{title}</h3>
      </div>
    );
  }

  return (
    <Image 
      src={src} 
      alt={alt} 
      fill 
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
      className="object-contain group-hover:scale-105 transition-transform duration-500" 
      onError={() => setError(true)}
    />
  );
}