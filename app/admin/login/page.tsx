"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Lock, Mail, GraduationCap } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({ email, password });
      if (error) throw new Error(error.message);
      
      // Redirect to your hidden admin path after successful login
      window.location.href = `/${process.env.NEXT_PUBLIC_ADMIN_PATH || 'secure-admin-panel'}`;
      
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-primary/20 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-accent/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 relative z-10">
        <div className="text-center mb-8">
          <div className="bg-brand-primary text-white p-3 rounded-2xl inline-flex mb-4 shadow-lg shadow-brand-primary/30">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-brand-dark mb-2">Admin Access</h1>
          <p className="text-slate-500 font-medium">Authorized Personnel Only</p>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-6 text-sm font-medium border border-red-100">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all" placeholder="admin@toppersacademy.com" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all" placeholder="••••••••" />
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-brand-primary text-white py-3.5 rounded-xl font-bold text-lg hover:bg-blue-600 shadow-lg shadow-brand-primary/30 transition-all disabled:opacity-70 mt-4">
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm font-bold text-slate-400">
          <p>Toppers Academy CMS</p>
        </div>
      </div>
    </div>
  );
}
