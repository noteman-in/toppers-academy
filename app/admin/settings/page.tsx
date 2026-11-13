import { prisma } from "@/lib/prisma";
import { Settings } from "lucide-react";
import SettingsForm from "./SettingsForm";

export default async function SettingsAdminPage() {
  let settings = await prisma.siteSettings.findUnique({ where: { id: "global" } });
  if (!settings) {
    settings = await prisma.siteSettings.create({ data: { id: "global" } });
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <Settings className="w-8 h-8 text-brand-primary" />
        <h1 className="text-3xl font-bold text-brand-dark">Website Settings</h1>
      </div>
      
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}