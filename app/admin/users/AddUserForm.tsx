"use client";

import { useState } from "react";
import { createAdminUser } from "./actions";
import { UserPlus, Copy, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function AddUserForm() {
  const [isCreating, setIsCreating] = useState(false);
  const [successData, setSuccessData] = useState<{ email: string, password: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsCreating(true);
    const formData = new FormData(e.currentTarget);
    
    const result = await createAdminUser(formData);
    
    if (result.error) {
      toast.error(result.error);
    } else if (result.success && result.email && result.password) {
      setSuccessData({ email: result.email, password: result.password });
      (e.target as HTMLFormElement).reset();
    }
    setIsCreating(false);
  }

  const copyToClipboard = () => {
    if (!successData) return;
    const text = `Admin Login Details:\nURL: ${window.location.origin}/${process.env.NEXT_PUBLIC_ADMIN_PATH || 'secure-admin-panel'}/login\nEmail: ${successData.email}\nPassword: ${successData.password}`;
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  if (successData) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-200 h-fit">
        <div className="text-center mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
          <h2 className="text-xl font-bold text-brand-dark">Admin Created Successfully!</h2>
          <p className="text-sm text-slate-500">Please copy these credentials and send them to the staff member.</p>
        </div>
        
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 mb-6">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Email</p>
            <p className="font-medium text-brand-dark">{successData.email}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Temporary Password</p>
            <p className="font-medium text-brand-dark">{successData.password}</p>
          </div>
        </div>

        <button onClick={copyToClipboard} className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white py-3 rounded-xl font-bold hover:bg-blue-600 shadow-md transition-colors mb-3">
          <Copy className="w-4 h-4" /> Copy Credentials
        </button>
        
        <button onClick={() => setSuccessData(null)} className="w-full text-slate-500 text-sm font-bold hover:text-brand-dark">
          Add another user
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit">
      <h2 className="text-xl font-bold text-brand-dark mb-4 flex items-center gap-2">
        <UserPlus className="w-5 h-5 text-brand-primary" /> Add New Admin
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
          <input type="text" name="name" required placeholder="e.g. Sahil Gupta" className="w-full px-4 py-2 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-brand-primary" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
          <input type="email" name="email" required placeholder="teacher@toppersacademy.com" className="w-full px-4 py-2 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-brand-primary" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Temporary Password</label>
          <input type="text" name="password" required minLength={8} placeholder="Set a password (e.g. Toppers2026!)" className="w-full px-4 py-2 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-brand-primary" />
        </div>
        <button type="submit" disabled={isCreating} className="w-full bg-brand-primary text-white py-3 rounded-xl font-bold hover:bg-blue-600 shadow-md transition-colors mt-2 disabled:opacity-50">
          {isCreating ? "Creating..." : "Create Admin Access"}
        </button>
      </form>
    </div>
  );
}