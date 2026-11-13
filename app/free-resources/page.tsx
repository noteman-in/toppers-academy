import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { Download, FileText } from "lucide-react";

export default async function FreeResourcesPage() {
  const resources = await prisma.resource.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F9] bg-dot-pattern">
      <Header />
      <main className="flex-grow pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-brand-dark mb-16 text-center">Free Study <span className="text-brand-primary">Material</span></h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((res) => (
              <div key={res.id} className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 flex flex-col">
                <div className="bg-brand-primary/10 p-3 rounded-xl text-brand-primary w-fit mb-4"><FileText className="w-6 h-6" /></div>
                <h3 className="text-xl font-bold text-brand-dark mb-2">{res.title}</h3>
                <p className="text-slate-600 text-sm mb-6 flex-grow">{res.description}</p>
                <a href={res.fileUrl} target="_blank" className="flex items-center justify-center gap-2 w-full bg-brand-dark text-white py-3 rounded-xl font-bold"><Download className="w-4 h-4" /> Download PDF</a>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}