"use client";
import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { createCourse } from "@/app/admin/courses/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AdminCourseForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!imagePreview) {
      toast.error("Please upload a course image before publishing.");
      return;
    }

    setIsPending(true);
    const formData = new FormData(e.currentTarget);
    
    const result = await createCourse(formData);
    
    if (result?.error) {
      toast.error(result.error);
      setIsPending(false);
      return;
    }

    toast.success("Course published successfully!");
    setImagePreview(null);
    setFileName("");
    (e.target as HTMLFormElement).reset();
    setIsPending(false);
    router.refresh();
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit">
      <h2 className="text-xl font-bold text-brand-dark mb-4">Add New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Course Image <span className="text-red-500">*</span></label>
          <div className="flex flex-col gap-3">
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover rounded-lg border border-slate-200" />
            )}
            <div className="flex items-center gap-3">
              <label className="cursor-pointer bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                {fileName ? "Change Image" : "Upload Image"}
                <input 
                  type="file" 
                  name="image" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  className="hidden" 
                />
              </label>
              {fileName && <span className="text-xs text-slate-500 font-medium truncate max-w-[150px]">{fileName}</span>}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Course Title</label>
          <input type="text" name="title" required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary" placeholder="e.g. Accountancy Masterclass" />
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
          <label className="block text-sm font-bold text-slate-700 mb-1">Short Description</label>
          <textarea name="description" required rows={3} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary resize-none" placeholder="What will students learn?" />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Price (Optional)</label>
          <input type="text" name="price" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary" placeholder="e.g. ₹4,999" />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Purchase URL (App Link)</label>
          <input type="url" name="purchaseUrl" required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary" placeholder="https://your-app-link.com/course" />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Web Purchase URL (Optional)</label>
          <input type="url" name="webPurchaseUrl" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary" placeholder="https://your-website.com/checkout" />
        </div>
        
        <div className="flex items-center gap-2 mt-4">
          <input type="checkbox" name="isFeatured" id="isFeatured" className="w-4 h-4 text-brand-primary rounded border-slate-300" />
          <label htmlFor="isFeatured" className="text-sm font-bold text-slate-700">Feature on Homepage</label>
        </div>
        
        <button type="submit" disabled={isPending} className="w-full bg-brand-primary text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors mt-2 shadow-md disabled:opacity-50 cursor-pointer">
          {isPending ? "Publishing..." : "Publish Course"}
        </button>
      </form>
    </div>
  );
}