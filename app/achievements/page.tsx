import HeaderWrapper from "@/components/HeaderWrapper";
import Footer from "@/components/Footer";
import { Trophy } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function AchievementsPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "global" } });
  const academyName = settings?.academyName || "Toppers Academy";

  const toppers = [
    { name: "Rahul Sharma", score: "99%", exam: "CBSE Class 12 Accountancy", year: "2023" },
    { name: "Priya Singh", score: "98%", exam: "CBSE Class 12 Economics", year: "2023" },
    { name: "Amit Kumar", score: "97%", exam: "CBSE Class 12 Business Studies", year: "2022" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F9] bg-dot-pattern">
      <HeaderWrapper />
      <main className="flex-grow pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-brand-dark mb-6">
              Our <span className="text-brand-primary">Toppers</span>
            </h1>
            <p className="text-lg text-slate-600">Celebrating the hard work and success of {academyName} students.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {toppers.map((student, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 text-center relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-2 bg-brand-accent"></div>
                <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-primary">
                  <Trophy className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-brand-dark mb-1">{student.name}</h3>
                <p className="text-brand-accent font-bold text-xl mb-4">{student.score}</p>
                <p className="text-slate-600 font-medium text-sm">{student.exam}</p>
                <p className="text-slate-400 text-xs mt-1">Batch of {student.year}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}