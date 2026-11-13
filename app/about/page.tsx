import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Award, BookOpen, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F9] bg-dot-pattern">
      <Header />
      <main className="flex-grow pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="relative group">
              <div className="relative h-[500px] rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                <img src="/images/vikrant-hero.jpg" alt="Vikrant Ahuja" className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-6 left-6 z-10">
                  <h3 className="text-white text-3xl font-bold mb-1">Vikrant Ahuja</h3>
                  <p className="text-brand-accent font-bold uppercase text-sm">Founder & Lead Educator</p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full font-bold text-sm">
                <Award className="w-4 h-4" /> 32+ Years of Excellence
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-brand-dark leading-tight">
                Transforming Commerce Education, One Student at a Time.
              </h1>
              <p className="text-lg text-slate-600">
                With over three decades of dedicated teaching experience, Vikrant Ahuja has become a trusted name in Commerce education. His journey began with a simple belief: <strong>Commerce is not about memorizing formulas, but understanding the logic behind them.</strong>
              </p>
              <p className="text-lg text-slate-600">
                Throughout his career, he has mentored thousands of students, helping them secure top ranks in CBSE boards and various competitive exams.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}