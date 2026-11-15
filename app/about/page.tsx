import HeaderWrapper from "@/components/HeaderWrapper";
import Footer from "@/components/Footer";
import { Award, BookOpen, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F9] bg-dot-pattern">
      <HeaderWrapper />
      
      <main className="flex-grow pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            
            {/* Image Container */}
            <div className="relative group">
              <div className="relative h-[550px] rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-slate-200">
                <img 
                  src="/images/vikrant-hero.png" 
                  alt="Vikrant Ahuja - Founder of Toppers Academy of Commerce" 
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-8 left-8 z-10">
                  <h3 className="text-white text-3xl font-bold mb-1">Vikrant Ahuja</h3>
                  <p className="text-brand-accent font-bold uppercase tracking-widest text-sm">Founder & Lead Educator</p>
                </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -top-6 -right-6 bg-gradient-to-br from-brand-accent to-yellow-500 p-4 rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.4)] z-20">
                <p className="text-3xl font-extrabold text-white text-center">32+</p>
                <p className="text-[10px] font-bold text-white/90 uppercase tracking-wider text-center leading-tight mt-1">Years of<br/>Legacy</p>
              </div>
            </div>

            {/* Intro Text */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full font-bold text-sm tracking-wide">
                <Award className="w-4 h-4" /> Dehradun's Most Trusted Commerce Mentor
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-brand-dark leading-[1.15]">
                The Legacy of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-400">
                  Vikrant Ahuja
                </span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                When students and parents in Dehradun think of commerce education, one name stands out. With a teaching career spanning nearly three decades, Mr. Ahuja has become a cornerstone of academic excellence in the region, known for transforming complex financial theories into accessible, engaging concepts.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                His journey began with a simple, powerful belief: <strong>commerce is not about rote memorization, but about understanding the logic that drives the business world.</strong> This philosophy has guided thousands of students under his mentorship, helping them not only secure top ranks in their CBSE and ISC board exams but also build a deep-seated passion for Accountancy, Economics, and Business Studies.
              </p>
            </div>
          </div>

          {/* Academy Foundation Section */}
          <div className="bg-white rounded-3xl p-8 md:p-16 shadow-lg border border-slate-200 mb-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-brand-primary text-white p-4 rounded-2xl shadow-lg">
                  <GraduationCap className="w-10 h-10" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-brand-dark mb-6">The Foundation of Toppers Academy</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                To formalize his commitment to commerce education, Mr. Ahuja established <strong>Toppers Academy of Commerce in 1996</strong>. Located strategically on Sahastradhara Road in Dehradun, the academy has since grown into a premier destination for aspiring financial leaders, chartered accountants, and business professionals.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Under his leadership, Toppers Academy has moved beyond traditional teaching methods, creating an environment where discipline meets innovation, and where every student is prepared not just for exams, but for the real world.
              </p>
            </div>
          </div>

          {/* Why Choose Us (Grid with ONLY 2 cards) */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-dark mb-4">The Toppers Academy Advantage</h2>
              <p className="text-slate-600 text-lg">What truly sets us apart is our commitment to your success.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Card 1 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex gap-5">
                <div className="bg-blue-50 text-blue-600 p-3 rounded-xl h-fit shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2">Decades of Proven Results</h3>
                  <p className="text-slate-600 leading-relaxed">With a legacy spanning nearly thirty years, the academy has consistently produced board toppers and successful professionals through a bespoke, result-oriented teaching approach.</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex gap-5">
                <div className="bg-purple-50 text-purple-600 p-3 rounded-xl h-fit shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2">Specialized Commerce Programs</h3>
                  <p className="text-slate-600 leading-relaxed">We offer intensive coaching for Classes 11 and 12 (CBSE & ISC), specializing in Accountancy, Economics, and Business Studies, along with foundational support for CA.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Teaching Philosophy */}
          <div className="bg-[#0F172A] rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <BookOpen className="w-12 h-12 text-brand-accent mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-6">The Teaching Philosophy</h2>
              <p className="text-xl text-slate-300 italic leading-relaxed">
                "I don't just teach students how to pass exams. I teach them how to think, analyze, and apply commerce principles to the real world. When a student understands the 'why' behind a concept, the 'how' becomes effortless."
              </p>
              <p className="mt-8 text-brand-accent font-bold uppercase tracking-widest text-lg">— Vikrant Ahuja</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <Link 
              href="/courses" 
              className="inline-flex items-center gap-2 bg-brand-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-600 shadow-lg transition-all hover:-translate-y-1"
            >
              Explore Our Courses 
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}