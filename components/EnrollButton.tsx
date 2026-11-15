"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

export default function EnrollButton({ 
  mobileUrl, 
  webUrl 
}: { 
  mobileUrl: string, 
  webUrl?: string | null 
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      return /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
    };
    setIsMobile(checkMobile());
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (isMobile) {
      window.location.href = mobileUrl;
      return;
    }
    if (webUrl) {
      window.open(webUrl, "_blank");
      return;
    }
    e.preventDefault();
    toast.error("Purchases are made via our mobile app. Please open this page on your phone or download the app to continue.", {
      duration: 5000,
    });
  };

  return (
    <button 
      onClick={handleClick}
      className="flex items-center justify-center w-full gap-2 bg-brand-primary text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg cursor-pointer"
    >
      Enrol Now <ArrowRight className="w-4 h-4" />
    </button>
  );
}