import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function Footer() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "global" } });

  const academyName = settings?.academyName || "Toppers Academy";
  const email = settings?.contactEmail || "contact@toppersacademy.com";
  const phone = settings?.contactPhone || "+91 98765 43210";

  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-700 pb-12">
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-brand-primary text-white p-2 rounded-lg">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">{academyName}</h2>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
            Empowering commerce students with over 32 years of teaching excellence. 
            Master Accountancy, Economics, and Business Studies with proven methods.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6">Explore</h3>
          <ul className="space-y-3 text-sm text-slate-400 font-medium">
            <li><Link href="/about" className="hover:text-brand-primary transition-colors">About Us</Link></li>
            <li><Link href="/courses" className="hover:text-brand-primary transition-colors">All Courses</Link></li>
            <li><Link href="/test-series" className="hover:text-brand-primary transition-colors">Test Series</Link></li>
            <li><Link href="/free-resources" className="hover:text-brand-primary transition-colors">Free Resources</Link></li>
            <li><Link href="/youtube" className="hover:text-brand-primary transition-colors">YouTube Lectures</Link></li>
          </ul>
        </div>

        {/* Support & Legal */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6">Support</h3>
          <ul className="space-y-3 text-sm text-slate-400 font-medium">
            <li><Link href="/testimonials" className="hover:text-brand-primary transition-colors">Student Reviews</Link></li>
            <li><Link href="/achievements" className="hover:text-brand-primary transition-colors">Our Toppers</Link></li>
            <li><Link href="/faq" className="hover:text-brand-primary transition-colors">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-brand-primary transition-colors">Contact Us</Link></li>
            <li className="pt-2">{email}</li>
            <li>{phone}</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 font-medium">
        <p>&copy; {new Date().getFullYear()} {academyName}. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}