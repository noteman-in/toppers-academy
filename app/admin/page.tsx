import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import AdminPageViewsChart from "@/components/AdminPageViewsChart";
import { 
  BookOpen, Users, FileText, CheckSquare, ArrowRight, Download, Eye
} from "lucide-react";

export default async function AdminDashboard() {
  const session = await auth.api.getSession({ headers: await headers() });
  const secretPath = process.env.NEXT_PUBLIC_ADMIN_PATH || 'ops-master-2026';

  if (!session) redirect(`/${secretPath}/login`);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [
    totalCourses, totalTests, totalEnquiries, totalAttempts, totalResources,
    todayViews, topPages, recentEnquiries, recentAttempts
  ] = await Promise.all([
    prisma.course.count(),
    prisma.test.count(),
    prisma.enquiry.count(),
    prisma.testAttempt.count(),
    prisma.resource.count(),
    prisma.pageView.count({ where: { createdAt: { gte: today } } }),
    prisma.pageView.groupBy({ by: ['path'], where: { createdAt: { gte: today } }, _count: { path: true }, orderBy: { _count: { path: 'desc' } }, take: 6 }),
    prisma.enquiry.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
    prisma.testAttempt.findMany({ take: 5, orderBy: { createdAt: "desc" }, include: { test: true } }),
  ]);

  const stats = [
    { title: "Views Today", value: todayViews, icon: Eye, href: "#", color: "text-orange-600", bg: "bg-orange-100" },
    { title: "Courses", value: totalCourses, icon: BookOpen, href: `/${secretPath}/courses`, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Tests", value: totalTests, icon: CheckSquare, href: `/${secretPath}/tests`, color: "text-purple-600", bg: "bg-purple-100" },
    { title: "Attempts", value: totalAttempts, icon: Users, href: `/${secretPath}/results`, color: "text-green-600", bg: "bg-green-100" },
    { title: "Enquiries", value: totalEnquiries, icon: FileText, href: `/${secretPath}/enquiries`, color: "text-amber-600", bg: "bg-amber-100" },
    { title: "Resources", value: totalResources, icon: Download, href: `/${secretPath}/resources`, color: "text-pink-600", bg: "bg-pink-100" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold text-brand-dark">Welcome back, {session.user.name}</h1>
        <p className="text-slate-500 mt-2">Here is what is happening at Toppers Academy today.</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link key={i} href={stat.href} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} mb-3`}><Icon className="w-5 h-5" /></div>
              <h3 className="text-slate-500 font-bold text-[10px] uppercase tracking-wider">{stat.title}</h3>
              <p className="text-3xl font-extrabold text-brand-dark mt-1">{stat.value}</p>
            </Link>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-brand-dark">Recent Enquiries</h2>
            <Link href={`/${secretPath}/enquiries`} className="text-sm font-bold text-brand-primary hover:underline flex items-center gap-1 cursor-pointer">View All <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="space-y-4">
            {recentEnquiries.length === 0 ? <p className="text-slate-500 text-center py-4">No enquiries yet.</p> : recentEnquiries.map((enquiry) => (
              <div key={enquiry.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div><h3 className="font-bold text-brand-dark">{enquiry.name}</h3><p className="text-xs text-slate-500">{enquiry.phone}</p></div>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-md">{enquiry.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-brand-dark">Recent Test Attempts</h2>
            <Link href={`/${secretPath}/results`} className="text-sm font-bold text-brand-primary hover:underline flex items-center gap-1 cursor-pointer">View All <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="space-y-4">
            {recentAttempts.length === 0 ? <p className="text-slate-500 text-center py-4">No test attempts yet.</p> : recentAttempts.map((attempt) => (
              <div key={attempt.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div><h3 className="font-bold text-brand-dark">{attempt.studentName}</h3><p className="text-xs text-slate-500">{attempt.test.title}</p></div>
                <div className="text-right"><p className="font-extrabold text-brand-dark">{attempt.score} / {attempt.totalQuestions}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Score</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-brand-dark flex items-center gap-2"><Eye className="w-5 h-5 text-brand-primary" /> Most Visited Pages Today</h2>
        </div>
        {topPages.length === 0 ? <p className="text-slate-500 text-center py-8">No page views tracked today.</p> : <AdminPageViewsChart data={topPages} />}
      </div>
    </div>
  );
}