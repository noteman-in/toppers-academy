"use client";
import { useActionState, useEffect } from "react";
import { updateSettings } from "./actions";
import { toast } from "sonner";
import { Save } from "lucide-react";

export default function SettingsForm({ settings }: { settings: any }) {
  const [state, formAction, isPending] = useActionState(updateSettings, null);

  useEffect(() => {
    if (state?.success) toast.success(state.message);
    if (state?.success === false) toast.error(state.message);
  }, [state]);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">Academy Name</label>
        <input type="text" name="academyName" defaultValue={settings.academyName} required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary" />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Contact Phone</label>
          <input type="text" name="contactPhone" defaultValue={settings.contactPhone} required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Contact Email</label>
          <input type="email" name="contactEmail" defaultValue={settings.contactEmail} required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">WhatsApp Number (No + or spaces)</label>
        <input type="text" name="whatsappNumber" defaultValue={settings.whatsappNumber} required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary" placeholder="e.g. 919876543210" />
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">Full Address</label>
        <textarea name="address" defaultValue={settings.address} required rows={3} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary resize-none" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">YouTube URL</label>
          <input type="url" name="youtubeUrl" defaultValue={settings.youtubeUrl} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">LinkedIn URL</label>
          <input type="url" name="linkedinUrl" defaultValue={settings.linkedinUrl} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary" />
        </div>
      </div>
          {/* ADD THIS BLOCK BEFORE THE SAVE BUTTON */}
      <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-6 mt-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Announcement Text (Leave blank to hide)</label>
          <input type="text" name="announcementText" defaultValue={settings.announcementText} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary" placeholder="e.g. New Batch Starting Soon!" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Announcement Link</label>
          <input type="text" name="announcementLink" defaultValue={settings.announcementLink} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary" placeholder="e.g. /courses" />
        </div>
      </div>
      {/* END OF NEW BLOCK */}
      <button type="submit" disabled={isPending} className="flex items-center justify-center gap-2 w-full bg-brand-primary text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors mt-6 shadow-md disabled:opacity-50">
        <Save className="w-5 h-5" /> {isPending ? "Saving..." : "Save Settings"}
      </button>
    </form>
  );
}