import HeaderWrapper from "@/components/HeaderWrapper";
import Footer from "@/components/Footer";
import ContactForm from "./ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function ContactPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "global" } });
  const academyName = settings?.academyName || "Toppers Academy";

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F9] bg-dot-pattern">
      <HeaderWrapper />
      <main className="flex-grow pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-brand-dark mb-6">Get in <span className="text-brand-primary">Touch</span></h1>
            <p className="text-lg text-slate-600">Contact {academyName} for any queries.</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
                <h2 className="text-2xl font-bold text-brand-dark mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Phone className="w-6 h-6 text-brand-primary" /> 
                    <div>
                      <h4 className="font-bold text-brand-dark">Phone</h4>
                      <p className="text-slate-600">{settings?.contactPhone || "+91 98765 43210"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail className="w-6 h-6 text-brand-primary" /> 
                    <div>
                      <h4 className="font-bold text-brand-dark">Email</h4>
                      <p className="text-slate-600">{settings?.contactEmail || "contact@toppersacademy.com"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin className="w-6 h-6 text-brand-primary" /> 
                    <div>
                      <h4 className="font-bold text-brand-dark">Address</h4>
                      <p className="text-slate-600">{settings?.address || "123 Commerce Street, New Delhi"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}