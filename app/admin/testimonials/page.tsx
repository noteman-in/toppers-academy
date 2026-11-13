import { prisma } from "@/lib/prisma";
import { createTestimonial } from "./actions";
import { CheckCircle } from "lucide-react";

export default async function TestimonialsAdminPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-brand-navy mb-8">Manage Testimonials</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
          <h2 className="text-xl font-bold text-brand-navy mb-4">Add New Testimonial</h2>
          <form action={createTestimonial} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
              <input type="text" name="name" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-navy outline-none" placeholder="e.g. Rahul Sharma" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class/Course</label>
              <input type="text" name="course" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-navy outline-none" placeholder="e.g. Class 12 Commerce" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
              <textarea name="review" required rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-navy outline-none" placeholder="Write the student's review here..." />
            </div>
            <button type="submit" className="w-full bg-brand-primary text-white py-2.5 rounded-md font-medium hover:bg-brand-dark transition-colors">
              Publish Testimonial
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-brand-navy mb-4">Published Testimonials</h2>
          {testimonials.length === 0 ? (
            <p className="text-gray-500">No testimonials added yet.</p>
          ) : (
            testimonials.map((t) => (
              <div key={t.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-brand-navy">{t.name}</h3>
                  {t.isVerified && <span className="flex items-center gap-1 text-xs text-green-600 font-semibold"><CheckCircle className="w-3 h-3" /> Verified</span>}
                </div>
                <p className="text-sm text-brand-gold font-medium mb-2">{t.course}</p>
                <p className="text-gray-600 text-sm italic">"{t.review}"</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}