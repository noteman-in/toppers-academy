import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import { prisma } from "@/lib/prisma";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Toppers Academy of Commerce",
  description: "Learn Commerce with Vikrant Ahuja, bringing over 32 years of teaching experience.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Fetch settings for the WhatsApp button
  const settings = await prisma.siteSettings.findUnique({ where: { id: "global" } });
  const waNumber = settings?.whatsappNumber || "919876543210";

  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} antialiased bg-slate-50`}>
        {children}
        <WhatsAppButton phoneNumber={waNumber} />
      </body>
    </html>
  );
}