import { prisma } from "@/lib/prisma";
import { deleteResource } from "./actions";
import AdminResourceForm from "./AdminResourceForm";
import { Trash2, FileText } from "lucide-react";

export default async function ResourcesAdminPage() {
  const resources = await prisma.resource.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-brand-dark mb-8">Manage Free Resources</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <AdminResourceForm />

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-brand-dark mb-4">Uploaded Resources</h2>
          {resources.length === 0 ? (
            <p className="text-slate-500 bg-white p-6 rounded-2xl border border-slate-200 text-center">No resources uploaded yet.</p>
          ) : (
            resources.map((res) => (
              <div key={res.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-start gap-4">
                <div className="bg-brand-primary/10 p-3 rounded-xl text-brand-primary">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-brand-dark">{res.title}</h3>
                  <p className="text-xs text-brand-primary font-bold mt-1 mb-2">{res.classLevel} • {res.subject}</p>
                  <div className="flex gap-2 mt-3">
                    <a href={res.fileUrl} target="_blank" className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg font-bold">View PDF</a>
                    <form action={deleteResource}>
                      <input type="hidden" name="id" value={res.id} />
                      <button type="submit" className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}