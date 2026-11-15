import HeaderWrapper from "@/components/HeaderWrapper";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export default async function FAQPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "global" } });
  const academyName = settings?.academyName || "Toppers Academy";

  const faqs = [
    { q: `What classes do you offer at ${academyName}?`, a: "We offer comprehensive commerce classes for Class 11 and Class 12, covering Accountancy, Economics, and Business Studies." },
    { q: "Who teaches the courses?", a: "All courses are taught by Vikrant Ahuja, who brings over 32 years of teaching experience." },
    { q: "How do I purchase a course?", a: "Click on the 'Enrol Now' button on any course page. You will be redirected to our official learning app to complete your purchase safely." },
    { q: "Are the free study materials actually free?", a: "Yes! We provide free sample papers, revision notes, and important questions in the 'Free Resources' section." },
    { q: "How can I contact the academy?", a: "You can use the Contact page to send us a message, or click the floating WhatsApp button to chat with us directly." }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F9] bg-dot-pattern">
      <HeaderWrapper />
      <main className="flex-grow pt-28 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-brand-dark mb-6">
              Frequently Asked <span className="text-brand-primary">Questions</span>
            </h1>
            <p className="text-lg text-slate-600">Everything you need to know about {academyName}.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-white rounded-2xl shadow-sm border border-slate-200 group">
                <summary className="px-6 py-5 font-bold text-brand-dark cursor-pointer list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-brand-primary group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-5 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}