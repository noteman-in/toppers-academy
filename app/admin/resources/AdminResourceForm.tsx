"use client";
import { useState } from "react";
import { FileUp } from "lucide-react";
import { uploadResource } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AdminResourceForm() {
  const [fileName, setFileName] = useState<string>("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData(e.currentTarget);
    
    await uploadResource(formData);
    
    toast.success("Resource uploaded successfully!");
    setFileName("");
    (e.target as HTMLFormElement).reset();
    setIsPending(false);
    router.refresh();
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit">
      <h2 className="text-xl font-bold text-brand-dark mb-4">Upload New PDF</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">PDF File <span className="text-red-500">*</span></label>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <label className="cursor-pointer bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-2">
                <FileUp className="w-4 h-4" />
                {fileName ? "Change PDF" : "Select PDF"}
                <input type="file" name="file" accept=".pdf" onChange={(e) => setFileName(e.target.files?.[0]?.name || "")} required className="hidden" />
              </label>
              {fileName && <span className="text-xs text-slate-500 font-medium truncate max-w-[150px]">{fileName}</span>}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Resource Title</label>
          <input type="text" name="title" required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary" placeholder="e.g. Chapter 1 Revision Notes" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Class</label>
            <input type="text" name="classLevel" required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary" placeholder="Class 12" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Subject</label>
            <input type="text" name="subject" required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary" placeholder="Accountancy" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Description</label>
          <textarea name="description" required rows={3} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary resize-none" placeholder="Brief description of the file..." />
        </div>
        
        <button type="submit" disabled={isPending} className="w-full bg-brand-primary text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors mt-2 shadow-md disabled:opacity-50">
          {isPending ? "Uploading..." : "Upload Resource"}
        </button>
      </form>
    </div>
  );
}