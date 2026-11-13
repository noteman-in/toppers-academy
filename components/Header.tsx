"use client";

import Link from "next/link";
import { Menu, X, GraduationCap, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Header({ 
  academyName = "Toppers Academy", 
  announcementText = "", 
  announcementLink = "" 
}: { 
  academyName?: string, 
  announcementText?: string, 
  announcementLink?: string 
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Test Series", href: "/test-series" },
    { name: "Free Resources", href: "/free-resources" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div className="w-full flex flex-col">
      {/* DYNAMIC Announcement Bar */}
            {/* DYNAMIC Announcement Bar */}
      {announcementText && (
        <div className="bg-[#0F172A] text-white py-2 border-b border-white/10 relative z-50">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-2 text-sm font-medium text-center">
            <span className="bg-brand-accent text-[#0F172A] px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider">New</span>
            <span className="text-slate-300">{announcementText}</span>
            
            {announcementLink && (
              announcementLink.startsWith("http") ? (
                <a href={announcementLink} target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:text-yellow-400 flex items-center gap-1 transition-colors underline decoration-brand-accent/30">
                  View Now <ArrowRight className="w-4 h-4" />
                </a>
              ) : (
                <Link href={announcementLink} className="text-brand-accent hover:text-yellow-400 flex items-center gap-1 transition-colors underline decoration-brand-accent/30">
                  View Now <ArrowRight className="w-4 h-4" />
                </Link>
              )
            )}
          </div>
        </div>
      )}

      {/* Main Navigation Header */}
      <header className="bg-[#0F172A]/90 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="bg-brand-primary text-white p-2 rounded-xl group-hover:scale-105 transition-transform shadow-lg shadow-brand-primary/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white tracking-tight leading-none">
                {academyName}
              </span>
              <span className="text-xs font-bold text-brand-accent tracking-widest uppercase mt-1">
                By Vikrant Ahuja
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex space-x-8">
            {navLinks.map((item) => (
              <Link key={item.name} href={item.href} className="text-slate-300 hover:text-white font-medium transition-colors">
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/courses" className="bg-brand-primary text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all hover:-translate-y-0.5">
              Explore Courses
            </Link>
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#0F172A] border-b border-white/10 shadow-2xl py-4 px-4 flex flex-col space-y-2">
            {navLinks.map((item) => (
              <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl font-medium transition-colors">
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10 mt-2">
              <Link href="/courses" onClick={() => setIsMobileMenuOpen(false)} className="bg-brand-primary text-white px-6 py-3 rounded-xl font-semibold text-center hover:bg-blue-600 transition-all block">
                Explore Courses
              </Link>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}