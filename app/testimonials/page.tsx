import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { Star } from "lucide-react";

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F9] bg-dot-pattern">
      <Header />
      <main className="flex-grow pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-brand-dark mb-16">Student <span className="text-brand-primary">Success Stories</span></h1>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
                <div className="flex gap-1 text-brand-accent mb-6">{[...Array(5)].map((_, i) => <Star key={i} className="fill-current w-5 h-5" />)}</div>
                <p className="text-slate-700 italic mb-6">"{t.review}"</p>
                <div className="flex items-center gap-4"><div className="w-12 h-12 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold">{t.name.charAt(0)}</div><div><h4 className="font-bold text-brand-dark">{t.name}</h4><p className="text-sm text-brand-primary">{t.course}</p></div></div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}