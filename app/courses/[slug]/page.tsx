import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, CheckCircle2, PlayCircle, BookOpen, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// --- SEO METADATA ---
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const course = await prisma.course.findUnique({ where: { slug: resolvedParams.slug } });
  if (!course) return { title: "Course Not Found" };
  return { title: course.title, description: course.description };
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const course = await prisma.course.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!course) notFound();

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F9] bg-dot-pattern">
      <Header />

      <main className="flex-grow pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link href="/courses" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-primary font-bold mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back to all courses
          </Link>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {course.classLevel}
                  </span>
                  <span className="bg-brand-accent text-[#0F172A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {course.subject}
                  </span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-extrabold text-brand-dark mb-6">
                  {course.title}
                </h1>
                
                <p className="text-lg text-slate-600 leading-relaxed">
                  {course.description}
                </p>
              </div>

              <div className="h-80 bg-[#0F172A] rounded-3xl flex items-center justify-center relative overflow-hidden group cursor-pointer border border-slate-800">
                 <div className="absolute inset-0 bg-brand-primary/10"></div>
                 <PlayCircle className="w-20 h-20 text-white/50 group-hover:text-brand-primary group-hover:scale-110 transition-all duration-300 z-10" />
                 <p className="absolute bottom-6 text-white/70 font-bold tracking-widest uppercase text-sm z-10">Course Preview</p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                <h2 className="text-2xl font-bold text-brand-dark mb-6">What you'll learn</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Complete syllabus coverage",
                    "Past 10 years question papers",
                    "Chapter-wise revision notes",
                    "Doubt clearing sessions",
                    "Live test series access",
                    "Exam strategy masterclasses"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-slate-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 sticky top-32">
                <h3 className="text-xl font-bold text-brand-dark mb-2">Enrol in this course</h3>
                <p className="text-slate-500 text-sm mb-6">Get instant access to all materials.</p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-slate-600">
                    <BookOpen className="w-5 h-5 text-brand-primary" />
                    <span className="font-medium">Full Syllabus Coverage</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Clock className="w-5 h-5 text-brand-primary" />
                    <span className="font-medium">Lifetime Access</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <ShieldCheck className="w-5 h-5 text-brand-primary" />
                    <span className="font-medium">Verified Content</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <div className="flex items-end gap-2 mb-6">
                    <span className="text-4xl font-extrabold text-brand-dark">₹4,999</span>
                    <span className="text-lg text-slate-400 line-through font-bold mb-1">₹9,999</span>
                  </div>

                  <a 
                    href={course.purchaseUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-brand-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-600 shadow-[0_10px_20px_-10px_rgba(59,130,246,0.5)] transition-all hover:-translate-y-0.5"
                  >
                    Buy Now on App
                  </a>
                  <p className="text-center text-xs text-slate-400 mt-4">
                    You will be redirected to our official learning app to complete your purchase.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}