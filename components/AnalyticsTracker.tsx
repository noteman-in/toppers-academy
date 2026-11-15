"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Don't track admin routes or api routes
    if (pathname.startsWith("/admin") || pathname.startsWith("/api")) return;

    // Use sessionStorage to prevent counting the same page multiple times 
    // if the user just refreshes the page.
    const sessionKey = `viewed_${pathname}`;
    if (sessionStorage.getItem(sessionKey)) return;

    const trackView = async () => {
      try {
        await fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: pathname }),
        });
        // Mark this page as viewed for this session
        sessionStorage.setItem(sessionKey, "true");
      } catch (err) {
        console.error("Failed to track view");
      }
    };
    
    // Add a slight delay so it doesn't block the page load
    const timeout = setTimeout(trackView, 1000);
    return () => clearTimeout(timeout);

  }, [pathname]);

  return null;
}