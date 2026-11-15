"use client";

import { useState } from "react";
import { resetAdminPassword } from "./actions";
import { ShieldAlert, KeyRound } from "lucide-react";
import Link from "next/link";

export default function EmergencyAccessPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await resetAdminPassword(new FormData(e.currentTarget));
    if (result.error) setError(result.error);
    if (result.success) setSuccess(true);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10">
        <div className="text-center mb-8">
          <div className="bg-red-100 text-red-600 p-3 rounded-2xl inline-flex mb-4">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-brand-dark mb-2">Emergency Access</h1>
          <p className="text-slate-500 font-medium">Restore admin access using the Master Key.</p>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-6 text-sm font-bold text-center border border-red-200">{error}</div>}

        {success ? (
          <div className="text-center bg-green-50 p-6 rounded-2xl border border-green-200">
            <h2 className="text-xl font-bold text-green-700 mb-2">Password Reset Successfully!</h2>
            <p className="text-green-600 mb-4 text-sm">You can now log in with your new password.</p>
            <Link href={`/${process.env.NEXT_PUBLIC_ADMIN_PATH || 'secure-admin-panel'}/login`} className="inline-block bg-brand-primary text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-600 transition-colors">
              Go to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Admin Email</label>
              <input type="email" name="email" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500" placeholder="admin@toppersacademy.com" />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Master Key</label>
              <div className="relative">
                <KeyRound className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input type="password" name="masterKey" required className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500" placeholder="Paste the 64-character key here" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">New Password</label>
              <input type="password" name="newPassword" required minLength={8} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500" placeholder="Enter a new strong password" />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-red-600 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg disabled:opacity-70 mt-4">
              {loading ? "Verifying..." : "Force Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}