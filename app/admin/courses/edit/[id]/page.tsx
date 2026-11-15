import { prisma } from "@/lib/prisma";
import { updateCourse } from "../../actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Image as ImageIcon } from "lucide-react";

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const course = await prisma.course.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!course) notFound();

  const secretPath = process.env.NEXT_PUBLIC_ADMIN_PATH || 'ops-master-2026';

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Link href={`/${secretPath}/courses`} className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-primary font-bold mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Courses
      </Link>
      
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-brand-dark mb-6">Edit Course</h1>
        
        <form action={updateCourse} className="space-y-5">
          <input type="hidden" name="id" value={course.id} />
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Change Image (Optional)</label>
            {course.imageUrl && (
              <div className="w-32 h-20 bg-slate-100 rounded-lg overflow-hidden mb-3">
                <img src={course.imageUrl} className="w-full h-full object-cover" />
              </div>
            )}
            <label className="cursor-pointer bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-2 w-fit">
              <ImageIcon className="w-4 h-4" /> Upload New Image
              <input type="file" name="image" accept="image/*" className="hidden" />
            </label>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Course Title</label>
            <input type="text" name="title" defaultValue={course.title} required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Class</label>
              <input type="text" name="classLevel" defaultValue={course.classLevel} required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Subject</label>
              <input type="text" name="subject" defaultValue={course.subject} required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Short Description</label>
            <textarea name="description" defaultValue={course.description} required rows={4} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none resize-none" />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Purchase URL (App Link)</label>
            <input type="url" name="purchaseUrl" defaultValue={course.purchaseUrl} required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Web Purchase URL (Optional)</label>
            <input type="url" name="webPurchaseUrl" defaultValue={course.webPurchaseUrl || ""} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
          </div>
          
          <div className="flex items-center gap-2 mt-4">
            <input type="checkbox" name="isFeatured" id="isFeatured" defaultChecked={course.isFeatured} className="w-4 h-4 text-brand-primary rounded border-slate-300" />
            <label htmlFor="isFeatured" className="text-sm font-bold text-slate-700">Feature on Homepage</label>
          </div>
          
          <button type="submit" className="flex items-center justify-center gap-2 w-full bg-brand-primary text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors mt-4 shadow-md">
            <Save className="w-5 h-5" /> Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}