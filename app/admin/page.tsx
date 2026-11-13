import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { LayoutDashboard } from "lucide-react";

export default async function AdminDashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-brand-dark">
          Welcome back, {session.user.name}
        </h1>
      </header>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center max-w-2xl mx-auto mt-12">
        <div className="w-20 h-20 bg-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <LayoutDashboard className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-extrabold text-brand-dark mb-4">Admin Panel is Live!</h2>
        <p className="text-slate-600 font-medium text-lg">
          Select a module from the sidebar to start managing your content.
        </p>
      </div>
    </div>
  );
}