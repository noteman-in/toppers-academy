import { prisma } from "@/lib/prisma";
import { deleteTest } from "./actions";
import CreateTestForm from "./CreateTestForm";
import Link from "next/link";
import { Pencil, Trash2, FileText, Users } from "lucide-react";

export default async function TestsAdminPage() {
  const tests = await prisma.test.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { questions: true, attempts: true } } }
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-brand-dark mb-8">Manage Tests & Exams</h1>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <CreateTestForm />

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-brand-dark mb-4">Published Tests</h2>
          {tests.length === 0 ? (
            <p className="text-slate-500 bg-white p-6 rounded-2xl border border-slate-200 text-center">No tests created yet.</p>
          ) : (
            tests.map((test) => (
              <div key={test.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-brand-dark text-lg leading-tight">{test.title}</h3>
                    <p className="text-xs text-brand-primary font-bold mt-1">{test.classLevel} • {test.subject}</p>
                  </div>
                  <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-md shrink-0">
                    {test.timeLimit} Mins
                  </span>
                </div>
                
                <div className="flex gap-4 text-sm text-slate-500 mb-4 mt-3">
                  <span className="flex items-center gap-1"><FileText className="w-4 h-4" /> {test._count.questions} Questions</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {test._count.attempts} Attempts</span>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                  <Link href={`/admin/tests/edit/${test.id}`} className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                    <Pencil className="w-3 h-3" /> Edit Test
                  </Link>
                  <form action={deleteTest}>
                    <input type="hidden" name="id" value={test.id} />
                    <button type="submit" className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                      <Trash2 className="w-3 h-3" /> Delete
                    </button>
                  </form>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}