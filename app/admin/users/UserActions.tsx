"use client";

import { useState } from "react";
import { Trash2, Key, Check, X } from "lucide-react";
import { deleteAdminUser, updateUserPassword } from "./actions";
import { toast } from "sonner";

export default function UserActions({ 
  id, 
  email, 
  isCurrentUser 
}: { 
  id: string; 
  email: string; 
  isCurrentUser: boolean 
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to revoke admin access for this user?")) return;
    
    setIsLoading(true);
    const formData = new FormData();
    formData.append("id", id);
    formData.append("email", email);
    await deleteAdminUser(formData);
    setIsLoading(false);
  }

  async function handlePasswordChange(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (newPassword.length < 8) return toast.error("Password must be at least 8 characters");
    
    setIsLoading(true);
    const formData = new FormData();
    formData.append("userId", id);
    formData.append("newPassword", newPassword);
    
    const result = await updateUserPassword(formData);
    
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Password updated successfully!");
      setIsEditing(false);
      setNewPassword("");
    }
    setIsLoading(false);
  }

  if (isCurrentUser) {
    return (
      <span className="text-xs font-bold bg-green-100 text-green-700 px-3 py-1 rounded-md">
        You
      </span>
    );
  }

  return (
    <div className="flex flex-col items-end gap-2">
      {isEditing ? (
        <form onSubmit={handlePasswordChange} className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
          <input 
            type="text" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            placeholder="New password" 
            className="px-3 py-1.5 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-brand-primary"
            minLength={8}
            required
          />
          <button type="submit" disabled={isLoading} className="bg-green-500 text-white p-1.5 rounded-lg hover:bg-green-600 disabled:opacity-50">
            <Check className="w-4 h-4" />
          </button>
          <button type="button" onClick={() => setIsEditing(false)} className="bg-slate-200 text-slate-600 p-1.5 rounded-lg hover:bg-slate-300">
            <X className="w-4 h-4" />
          </button>
        </form>
      ) : (
        <div className="flex gap-2">
          <button 
            onClick={() => setIsEditing(true)} 
            className="flex items-center gap-1 text-slate-600 hover:bg-slate-100 px-3 py-2 rounded-lg transition-colors text-sm font-bold"
          >
            <Key className="w-4 h-4" /> Change Password
          </button>
          
          <form onSubmit={handleDelete}>
            <button 
              type="submit" 
              disabled={isLoading}
              className="flex items-center gap-1 text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors text-sm font-bold disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" /> Revoke
            </button>
          </form>
        </div>
      )}
    </div>
  );
}