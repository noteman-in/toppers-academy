import HeaderWrapper from "@/components/HeaderWrapper"; // Use wrapper for dynamic academy name
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { ArrowRight, FileText, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";

export default async function TestSeriesPage() {
  // Fetch the actual tests created in the Admin panel
  const tests = await prisma.test.findMany({ 
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { questions: true } } } // Count the questions
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F9] bg-dot-pattern">
      <HeaderWrapper />
      <main className="flex-grow pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-brand-dark mb-6">
              Master Your Exams with <span className="text-brand-primary">Free Mock Tests</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Test your knowledge instantly. No login required. Just enter your details and start.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tests.length === 0 ? (
              <div className="col-span-3 text-center text-slate-500 py-10 bg-white rounded-xl border border-slate-200">
                No tests available yet. Check back soon!
              </div>
            ) : (
              tests.map((test) => (
                <div key={test.id} className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200 flex flex-col hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-brand-primary/10 p-3 rounded-xl text-brand-primary">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="bg-brand-primary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                        {test.classLevel}
                      </span>
                      <span className="ml-2 text-xs font-bold text-slate-500 uppercase tracking-wider">{test.subject}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-brand-dark mb-2">{test.title}</h3>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-500 font-medium mb-6 flex-grow">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {test.timeLimit} Mins</span>
                    <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> {test._count.questions} Questions</span>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <Link 
                      href={`/test-series/${test.id}`} 
                      className="flex items-center justify-center gap-2 w-full bg-brand-primary text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-md"
                    >
                      Start Test <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}