import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import { prisma } from "@/lib/prisma";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { Toaster } from "sonner";
import { unstable_cache } from "next/cache";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

// 1. MAKE METADATA DYNAMIC
export async function generateMetadata(): Promise<Metadata> {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "global" } });
  const academyName = settings?.academyName || "Commerce by Vikrant Ahuja";

  return {
    title: academyName,
    description: "Learn Commerce with Vikrant Ahuja, bringing over 32 years of teaching experience.",
    openGraph: {
      title: academyName,
      description: "Learn Commerce with Vikrant Ahuja, bringing over 32 years of teaching experience.",
    }
  };
}

const getCachedSettings = unstable_cache(
  async () => {
    try {
      if (process.env.NETLIFY === 'true') return null; 
      return await prisma.siteSettings.findUnique({ where: { id: "global" } });
    } catch (error) {
      console.error("DB fetch failed:", error);
      return null; 
    }
  },
  ['site-settings'],
  { revalidate: 3600 }
);

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getCachedSettings();
  const waNumber = settings?.whatsappNumber || "919876543210";

  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} antialiased bg-slate-50`}>
        <AnalyticsTracker />
        {children}
        <WhatsAppButton phoneNumber={waNumber} />
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}