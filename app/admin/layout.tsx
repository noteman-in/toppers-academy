import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LogOut, LayoutDashboard, BookOpen, Users, FileText, Settings, PenTool, CheckSquare } from "lucide-react";
import { Toaster } from "sonner";
import { BarChart } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });

  // Note: Login page will bypass this layout if we use route groups, 
  // but for now, this protects everything under /admin except the login route itself.
  // (We will need to move login to /admin/login and keep it outside this check, but for simplicity, let's just check session)

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-brand-dark text-white flex flex-col hidden md:flex shadow-xl z-20 sticky top-0 h-screen">
        <div className="h-20 flex items-center px-6 border-b border-white/10 shrink-0">
          <span className="text-xl font-bold tracking-tight text-white">Toppers Admin</span>
        </div>

        <nav className="flex-1 py-6 space-y-2 px-4 overflow-y-auto">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl font-medium text-slate-300 hover:text-white">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/admin/courses" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl font-medium text-slate-300 hover:text-white">
            <BookOpen className="w-5 h-5" /> Courses
          </Link>
          <Link href="/admin/tests" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl font-medium text-slate-300 hover:text-white">
            <CheckSquare className="w-5 h-5" /> Tests & Exams
          </Link>
          <Link href="/admin/testimonials" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl font-medium text-slate-300 hover:text-white">
            <Users className="w-5 h-5" /> Testimonials
          </Link>
          <Link href="/admin/blog" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl font-medium text-slate-300 hover:text-white">
            <PenTool className="w-5 h-5" /> Blog
          </Link>
          <Link href="/admin/resources" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl font-medium text-slate-300 hover:text-white">
            <FileText className="w-5 h-5" /> Resources
          </Link>
          <Link href="/admin/enquiries" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl font-medium text-slate-300 hover:text-white">
            <FileText className="w-5 h-5" /> Enquiries
          </Link>
          <Link href="/admin/results" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl font-medium transition-colors text-slate-300 hover:text-white">
            <BarChart className="w-5 h-5" /> Results
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl font-medium text-slate-300 hover:text-white">
            <Settings className="w-5 h-5" /> Settings
          </Link>
          
        </nav>

        <div className="p-4 border-t border-white/10 shrink-0">
          <form action={async () => {
            "use server";
            const { auth } = await import("@/lib/auth");
            await auth.api.signOut({ headers: await headers() });
            redirect("/admin/login");
          }}>
            <button type="submit" className="flex items-center gap-2 text-red-400 hover:text-red-300 font-bold w-full px-4 py-2">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {children}
      </main>
      <Toaster position="bottom-right" richColors />
    </div>
  );
}