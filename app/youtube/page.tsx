import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PlayCircle, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function YouTubePage() {
  const videos = [
    {
      id: "4OjIS5JD8H4", 
      title: "Commerce Masterclass: Core Concepts Explained",
      subject: "Accountancy",
      classLevel: "Class 12"
    },
    {
      id: "5tKSAh8J2wQ", 
      title: "Economics Lecture: Important Board Questions",
      subject: "Economics",
      classLevel: "Class 11"
    },
    {
      id: "Gu5robmfyEc", 
      title: "Business Studies: Exam Strategy & Tips",
      subject: "Business Studies",
      classLevel: "Class 12"
    },
    {
      id: "OD3A1d2gY1w", 
      title: "Doubt Clearing Session: Accountancy",
      subject: "Accountancy",
      classLevel: "Class 11"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F9] bg-dot-pattern">
      <Header />
      
      <main className="flex-grow pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Page Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-brand-dark mb-6">
              Free <span className="text-brand-primary">YouTube Lectures</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              Watch our latest educational videos and master commerce concepts with Vikrant Ahuja.
            </p>
            
            {/* Channel CTA Button */}
            <a 
              href="https://www.youtube.com/@vikrant-ahuja/videos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FF0000] text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-colors shadow-lg"
            >
              <PlayCircle className="w-5 h-5" /> Subscribe to our Channel <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </div>

          {/* Video Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {videos.map((vid, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                
                {/* Thumbnail Area */}
                <div className="aspect-video bg-slate-900 relative">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={`https://www.youtube.com/embed/${vid.id}`} 
                    title={vid.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="absolute inset-0"
                  ></iframe>
                </div>

                {/* Video Info */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-brand-primary/10 text-brand-primary text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {vid.classLevel}
                    </span>
                    <span className="text-xs font-bold text-brand-accent uppercase tracking-wider">
                      {vid.subject}
                    </span>
                  </div>
                  <h3 className="font-bold text-brand-dark text-lg leading-snug group-hover:text-brand-primary transition-colors">
                    {vid.title}
                  </h3>
                </div>

              </div>
            ))}
          </div>

          {/* View More CTA */}
          <div className="text-center mt-16">
            <p className="text-slate-500 mb-4">Want to see more? We have hundreds of videos on our channel.</p>
            <Link href="https://www.youtube.com/@vikrant-ahuja/videos" target="_blank" className="inline-flex items-center gap-2 text-brand-primary font-bold hover:text-brand-dark transition-colors bg-white px-6 py-3 rounded-full shadow-sm border border-slate-200">
              View All Videos on YouTube <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}