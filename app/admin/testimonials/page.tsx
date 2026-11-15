import { prisma } from "@/lib/prisma";
import { createTestimonial, deleteTestimonial } from "./actions";
import Link from "next/link";
import { CheckCircle, Pencil, Trash2 } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function TestimonialsAdminPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  const secretPath = process.env.NEXT_PUBLIC_ADMIN_PATH || 'secure-admin-panel';

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-brand-dark mb-8">Manage Testimonials</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit">
          <h2 className="text-xl font-bold text-brand-dark mb-4">Add New Testimonial</h2>
          <form action={createTestimonial} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Student Name</label>
              <input type="text" name="name" required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary" placeholder="e.g. Rahul Sharma" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Class/Course</label>
              <input type="text" name="course" required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary" placeholder="e.g. Class 12 Commerce" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Review</label>
              <textarea name="review" required rows={4} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary resize-none" placeholder="Write the student's review here..." />
            </div>
            <button type="submit" className="w-full bg-brand-primary text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-md">
              Publish Testimonial
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-brand-dark mb-4">Published Testimonials</h2>
          {testimonials.length === 0 ? (
            <p className="text-slate-500 bg-white p-6 rounded-2xl border border-slate-200 text-center">No testimonials added yet.</p>
          ) : (
            testimonials.map((t) => (
              <div key={t.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-brand-dark text-lg">{t.name}</h3>
                  {t.isVerified && <span className="flex items-center gap-1 text-xs text-green-600 font-semibold"><CheckCircle className="w-3 h-3" /> Verified</span>}
                </div>
                <p className="text-sm text-brand-accent font-bold mb-2">{t.course}</p>
                <p className="text-gray-600 text-sm italic mb-4">"{t.review}"</p>
                
                <div className="flex gap-2 pt-4 border-t border-slate-100">
                  <Link href={`/${secretPath}/testimonials/edit/${t.id}`} className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                    <Pencil className="w-3 h-3" /> Edit
                  </Link>
                  
                  <form action={deleteTestimonial}>
                    <input type="hidden" name="id" value={t.id} />
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