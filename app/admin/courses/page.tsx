import { prisma } from "@/lib/prisma";
import { deleteCourse } from "./actions";
import AdminCourseForm from "@/components/AdminCourseForm";
import Link from "next/link";
import { Pencil, Trash2, Image as ImageIcon } from "lucide-react";

export default async function CoursesAdminPage() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
  });

  const secretPath = process.env.NEXT_PUBLIC_ADMIN_PATH || 'ops-master-2026';

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-brand-dark mb-8">Manage Courses</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* The Form to Add a Course */}
        <AdminCourseForm />

        {/* The List of Published Courses */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-brand-dark mb-4">Published Courses</h2>
          {courses.length === 0 ? (
            <p className="text-slate-500 bg-white p-6 rounded-2xl border border-slate-200 text-center">No courses added yet.</p>
          ) : (
            courses.map((course) => (
              <div key={course.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex gap-4">
                <div className="w-20 h-20 bg-slate-100 rounded-xl overflow-hidden shrink-0 flex items-center justify-center text-slate-300">
                  {course.imageUrl ? <img src={course.imageUrl} className="w-full h-full object-cover" /> : <ImageIcon className="w-6 h-6" />}
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-brand-dark text-lg leading-tight">{course.title}</h3>
                      <p className="text-xs text-brand-primary font-bold mt-1">{course.classLevel} • {course.subject}</p>
                      {/* Show price in admin list too */}
                      <p className="text-sm font-bold text-slate-600 mt-1">₹{course.price || "0"}</p>
                    </div>
                    {course.isFeatured && <span className="text-[10px] bg-brand-accent/20 text-brand-accent px-2 py-1 rounded-md font-bold uppercase">Featured</span>}
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Link href={`/${secretPath}/courses/edit/${course.id}`} className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer">
                      <Pencil className="w-3 h-3" /> Edit
                    </Link>
                    <form action={deleteCourse}>
                      <input type="hidden" name="id" value={course.id} />
                      <button type="submit" className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer">
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