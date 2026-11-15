import Link from "next/link";
import { LogOut, LayoutDashboard, BookOpen, Users, FileText, Settings, CheckSquare, BarChart } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

// THIS PREVENTS NEXT.JS FROM CACHING THE LAYOUT
export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const headersList = await headers();
  const originalPath = headersList.get('x-original-path') || "";
  const isLoginHeader = headersList.get('x-is-login-page') === 'true';
  
  // BULLETPROOF CHECK: If either header says it's login, hide the sidebar
  const isLoginPage = isLoginHeader || originalPath.includes('/login');
  
  const secretPath = process.env.NEXT_PUBLIC_ADMIN_PATH || 'secure-admin-panel';

  let isOwner = false;
  if (session) {
    const dbUser = await prisma.user.findUnique({ where: { id: session.user.id } });
    isOwner = dbUser?.role === "OWNER";
  }

  // 1. If no session and NOT on login page -> Force redirect to login
  if (!session && !isLoginPage) {
    redirect(`/${secretPath}/login`);
  }

  // 2. If already logged in and trying to access login page -> Redirect to dashboard
  if (session && isLoginPage) {
    redirect(`/${secretPath}`);
  }

  // 3. If on login page, just render the form WITHOUT the sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // 4. Otherwise, render the secure dashboard layout with the sidebar
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-brand-dark text-white flex flex-col hidden md:flex shadow-xl z-20 sticky top-0 h-screen">
        <div className="h-20 flex items-center px-6 border-b border-white/10 shrink-0">
          <span className="text-xl font-bold tracking-tight text-white">Toppers Admin</span>
        </div>

        <nav className="flex-1 py-6 space-y-2 px-4 overflow-y-auto">
          <Link href={`/${secretPath}`} className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl font-medium text-slate-300 hover:text-white transition-colors">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href={`/${secretPath}/courses`} className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl font-medium text-slate-300 hover:text-white transition-colors">
            <BookOpen className="w-5 h-5" /> Courses
          </Link>
          <Link href={`/${secretPath}/tests`} className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl font-medium text-slate-300 hover:text-white transition-colors">
            <CheckSquare className="w-5 h-5" /> Tests & Exams
          </Link>
          <Link href={`/${secretPath}/results`} className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl font-medium text-slate-300 hover:text-white transition-colors">
            <BarChart className="w-5 h-5" /> Results
          </Link>
          <Link href={`/${secretPath}/testimonials`} className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl font-medium text-slate-300 hover:text-white transition-colors">
            <Users className="w-5 h-5" /> Testimonials
          </Link>
          <Link href={`/${secretPath}/resources`} className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl font-medium text-slate-300 hover:text-white transition-colors">
            <FileText className="w-5 h-5" /> Resources
          </Link>
          <Link href={`/${secretPath}/enquiries`} className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl font-medium text-slate-300 hover:text-white transition-colors">
            <FileText className="w-5 h-5" /> Enquiries
          </Link>
          <Link href={`/${secretPath}/settings`} className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl font-medium text-slate-300 hover:text-white transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </Link>
          
          {isOwner && (
            <Link href={`/${secretPath}/users`} className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl font-medium text-slate-300 hover:text-white transition-colors">
              <Users className="w-5 h-5" /> Admin Users
            </Link>
          )}
        </nav>

        <div className="p-4 border-t border-white/10 shrink-0">
          <form action={async () => {
            "use server";
            const { auth } = await import("@/lib/auth");
            await auth.api.signOut({ headers: await headers() });
            const { redirect } = await import("next/navigation");
            redirect(`/${secretPath}/login`);
          }}>
            <button type="submit" className="flex items-center gap-2 text-red-400 hover:text-red-300 font-bold w-full px-4 py-2 transition-colors">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}