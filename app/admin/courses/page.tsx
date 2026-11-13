import { prisma } from "@/lib/prisma";
import { createCourse, deleteCourse } from "./actions";
import Link from "next/link";
import { Pencil, Trash2, Image as ImageIcon } from "lucide-react";

export default async function CoursesAdminPage() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-brand-dark mb-8">Manage Courses</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Form to add new course */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit">
          <h2 className="text-xl font-bold text-brand-dark mb-4">Add New Course</h2>
          <form action={createCourse} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Course Image</label>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> Upload Image
                  <input type="file" name="image" accept="image/*" className="hidden" />
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Course Title</label>
              <input type="text" name="title" required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none" placeholder="e.g. Accountancy Masterclass" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Class</label>
                <input type="text" name="classLevel" required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none" placeholder="Class 12" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Subject</label>
                <input type="text" name="subject" required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none" placeholder="Accountancy" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Short Description</label>
              <textarea name="description" required rows={3} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none resize-none" placeholder="What will students learn?" />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Purchase URL (App Link)</label>
              <input type="url" name="purchaseUrl" required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none" placeholder="https://your-app-link.com/course" />
            </div>
            
            <div className="flex items-center gap-2 mt-4">
              <input type="checkbox" name="isFeatured" id="isFeatured" className="w-4 h-4 text-brand-primary rounded border-slate-300 focus:ring-brand-primary" />
              <label htmlFor="isFeatured" className="text-sm font-bold text-slate-700">Feature on Homepage</label>
            </div>
            
            <button type="submit" className="w-full bg-brand-primary text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors mt-2 shadow-md">
              Publish Course
            </button>
          </form>
        </div>

        {/* List of existing courses */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-brand-dark mb-4">Published Courses</h2>
          
          {courses.length === 0 ? (
            <p className="text-slate-500 bg-white p-6 rounded-2xl border border-slate-200 text-center">No courses added yet.</p>
          ) : (
            courses.map((course) => (
              <div key={course.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex gap-4">
                
                {/* Thumbnail */}
                <div className="w-20 h-20 bg-slate-100 rounded-xl overflow-hidden shrink-0 flex items-center justify-center text-slate-300">
                  {course.imageUrl ? (
                    <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-6 h-6" />
                  )}
                </div>
                
                {/* Info */}
                <div className="flex-grow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-brand-dark text-lg leading-tight">{course.title}</h3>
                      <p className="text-xs text-brand-primary font-bold mt-1">{course.classLevel} • {course.subject}</p>
                    </div>
                    {course.isFeatured && (
                      <span className="text-[10px] bg-brand-accent/20 text-brand-accent px-2 py-1 rounded-md font-bold uppercase shrink-0">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Link href={`/admin/courses/edit/${course.id}`} className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                      <Pencil className="w-3 h-3" /> Edit
                    </Link>
                    <form action={deleteCourse}>
                      <input type="hidden" name="id" value={course.id} />
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