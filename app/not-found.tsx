import Link from "next/link";
import { Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0F172A] text-white p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-accent/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 text-center space-y-6">
        <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-md border border-white/20">
          <AlertTriangle className="w-12 h-12 text-brand-accent" />
        </div>
        
        <h1 className="text-6xl font-extrabold tracking-tight">404</h1>
        <h2 className="text-3xl font-bold">Page Not Found</h2>
        <p className="text-slate-300 max-w-md mx-auto text-lg">
          Oops! The page you are looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        
        <div className="pt-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 bg-brand-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-600 shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all hover:-translate-y-1"
          >
            <Home className="w-5 h-5" /> Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}