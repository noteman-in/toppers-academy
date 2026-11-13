import { prisma } from "@/lib/prisma";
import { Phone, BarChart } from "lucide-react";

export default async function AdminResultsPage() {
  const attempts = await prisma.testAttempt.findMany({
    orderBy: { createdAt: "desc" },
    include: { test: true }
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-brand-dark flex items-center gap-3">
          <BarChart className="w-8 h-8 text-brand-primary" /> Student Test Results
        </h1>
        <div className="bg-brand-primary text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
          {attempts.length} Total
        </div>
      </div>
      
      <div className="grid gap-4">
        {attempts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 font-medium">No test attempts yet.</p>
          </div>
        ) : (
          attempts.map((attempt) => {
            const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);
            const dateStr = new Date(attempt.createdAt).toLocaleDateString('en-US', { 
              month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' 
            });

            return (
              <div key={attempt.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-brand-dark">{attempt.studentName}</h3>
                    <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                      <Phone className="w-3 h-3" /> {attempt.studentPhone}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-brand-primary">{attempt.test.title}</p>
                  <p className="text-xs text-slate-400 mt-2">Taken on {dateStr}</p>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-6 min-w-[250px] justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Score</p>
                    <p className="text-2xl font-extrabold text-brand-dark">{attempt.score} / {attempt.totalQuestions}</p>
                  </div>
                  <div className={`px-4 py-2 rounded-lg font-bold text-sm ${percentage >= 40 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {percentage}%
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}