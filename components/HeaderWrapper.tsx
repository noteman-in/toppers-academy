import { prisma } from "@/lib/prisma";
import Header from "./Header";

export default async function HeaderWrapper() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "global" } });
  
  return (
    <Header 
      academyName={settings?.academyName || "Toppers Academy"} 
      announcementText={settings?.announcementText || ""}
      announcementLink={settings?.announcementLink || ""}
    />
  );
}