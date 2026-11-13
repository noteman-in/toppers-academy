import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F9] bg-dot-pattern">
      <Header />
      <main className="flex-grow pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-brand-dark mb-6">
              Explore Our <span className="text-brand-primary">Courses</span>
            </h1>
            <p className="text-lg text-slate-600">
              Master Accountancy, Economics, and Business Studies with structured courses designed by Vikrant Ahuja.
            </p>
          </div>

          {courses.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-4xl mx-auto">
              <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-brand-dark mb-2">No courses available yet</h3>
              <p className="text-slate-500 mb-6">Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col relative group">
                  
                  {/* FIXED IMAGE CONTAINER */}
                  <div className="h-56 bg-[#0F172A] relative border-b border-slate-100 overflow-hidden flex items-center justify-center">
                     {course.imageUrl ? (
                        <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300 group-hover:scale-110 transition-transform duration-500">
                           <BookOpen className="w-16 h-16" />
                        </div>
                     )}
                  </div>

                  <div className="p-6 flex-grow flex flex-col bg-white">
                    {/* FIXED CLASS AND SUBJECT TAGS */}
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-brand-primary/10 text-brand-primary text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider">
                        {course.classLevel}
                      </span>
                      <span className="text-xs font-bold text-brand-accent uppercase tracking-wider">
                        {course.subject}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-brand-dark mb-3">{course.title}</h3>
                    <p className="text-slate-600 text-sm mb-6 flex-grow line-clamp-3">{course.description}</p>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                      <Link 
                        href={`/courses/${course.slug}`} 
                        className="flex items-center justify-center w-full gap-2 bg-brand-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg"
                      >
                        View Details <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}