import { prisma } from "@/lib/prisma";
import { updateTestimonial } from "../../actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const testimonial = await prisma.testimonial.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!testimonial) notFound();

  const secretPath = process.env.NEXT_PUBLIC_ADMIN_PATH || 'secure-admin-panel';

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Link href={`/${secretPath}/testimonials`} className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-primary font-bold mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Testimonials
      </Link>
      
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-brand-dark mb-6">Edit Testimonial</h1>
        
        <form action={updateTestimonial} className="space-y-5">
          <input type="hidden" name="id" value={testimonial.id} />
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Student Name</label>
            <input type="text" name="name" defaultValue={testimonial.name} required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary" />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Class/Course</label>
            <input type="text" name="course" defaultValue={testimonial.course} required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary" />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Review</label>
            <textarea name="review" defaultValue={testimonial.review} required rows={5} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary resize-none" />
          </div>
          
          <button type="submit" className="flex items-center justify-center gap-2 w-full bg-brand-primary text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors mt-4 shadow-md">
            <Save className="w-5 h-5" /> Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}