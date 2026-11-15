import Footer from "@/components/Footer";
import TeacherSlideshow from "@/components/TeacherSlideshow";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import HeaderWrapper from "@/components/HeaderWrapper";
import EnrollButton from "@/components/EnrollButton";
import CourseImage from "@/components/CourseImage";
import TestimonialTicker from "@/components/TestimonialTicker";

export default async function Home() {
  const rawTestimonials = await prisma.testimonial.findMany({
    take: 20,
    orderBy: { createdAt: "desc" },
  });

  const testimonials = rawTestimonials.sort(() => 0.5 - Math.random());

  const featuredCourses = await prisma.course.findMany({
    where: { isFeatured: true },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute top-0 w-full z-50">
        <HeaderWrapper />
      </div>

      <main className="flex-grow">
        <div className="relative bg-[#0F172A] pt-40 pb-32 lg:pt-48 lg:pb-48 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-accent/20 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-200 px-4 py-2 rounded-full font-bold text-sm tracking-wide backdrop-blur-md">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
                India's Premier Commerce Academy
              </div>

              <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] text-white">
                Commerce Is Not Difficult. <br />
                <span className="text-3xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-yellow-300 block mt-2">
                  It Just Needs The Right Teacher.
                </span>
              </h1>

              <p className="text-lg text-slate-200 max-w-xl leading-relaxed">
                Learn Commerce with Vikrant Ahuja, bringing over 32 years of
                teaching experience to your learning journey. Master Accountancy,
                Economics, and Business Studies with proven methods.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/courses"
                  className="flex items-center justify-center gap-2 bg-brand-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-600 shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all hover:-translate-y-1 cursor-pointer"
                >
                  Explore Courses <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/free-resources"
                  className="flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 backdrop-blur-sm transition-all cursor-pointer"
                >
                  <BookOpen className="w-5 h-5" /> Free Study Material
                </Link>
              </div>
            </div>

            <TeacherSlideshow />
          </div>
        </div>

        <div className="bg-[#F4F6F9] bg-dot-pattern">
          <div className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-extrabold text-brand-dark mb-4">Master Your Exams</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">Structured courses designed by experts to help you score 95+ in your board exams.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {featuredCourses.length === 0 ? (
                  <div className="col-span-3 text-center text-slate-500 py-10 bg-white rounded-xl border border-slate-200">No featured courses yet. Add some from the Admin panel!</div>
                ) : (
                  featuredCourses.map((course) => (
                    <div key={course.id} className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col relative cursor-pointer">

                      <div className="aspect-[16/9] bg-[#0F172A] relative border-b border-slate-100 overflow-hidden group flex items-center justify-center">
                        <CourseImage src={course.imageUrl || ""} alt={course.title} title={course.title} />
                      </div>

                      <div className="p-6 flex-grow flex flex-col bg-white">
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
                        
                        <div className="flex flex-col mt-auto pt-4 border-t border-slate-100 gap-3">
                          {/* Displaying the price here */}
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm text-slate-500 font-medium">Price:</span>
                            <span className="text-2xl font-extrabold text-brand-dark">{course.price || "Contact Us"}</span>
                          </div>
                          
                          <EnrollButton 
                            mobileUrl={course.purchaseUrl} 
                            webUrl={course.webPurchaseUrl} 
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="text-center mt-12">
                <Link href="/courses" className="inline-flex items-center gap-2 text-brand-primary font-bold hover:text-brand-dark transition-colors bg-white px-6 py-3 rounded-full shadow-sm border border-slate-200 cursor-pointer">
                  View All Courses <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="pb-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
              <h2 className="text-4xl font-extrabold text-brand-dark">Success Stories</h2>
            </div>
            <TestimonialTicker testimonials={testimonials} />
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}