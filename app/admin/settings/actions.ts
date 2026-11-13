"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateSettings(prevState: any, formData: FormData) {
  try {
    await prisma.siteSettings.update({
      where: { id: "global" },
      data: {
        academyName: formData.get("academyName") as string || "",
        contactPhone: formData.get("contactPhone") as string || "",
        contactEmail: formData.get("contactEmail") as string || "",
        address: formData.get("address") as string || "",
        whatsappNumber: formData.get("whatsappNumber") as string || "",
        youtubeUrl: formData.get("youtubeUrl") as string || "",
        linkedinUrl: formData.get("linkedinUrl") as string || "",
        announcementText: formData.get("announcementText") as string || "",
        announcementLink: formData.get("announcementLink") as string || "",
      },
    });
    revalidatePath("/", "layout");
    return { success: true, message: "Settings saved successfully!" };
  } catch (error: any) {
    console.error("Prisma Error:", error); // This will print to your terminal if it fails
    return { success: false, message: "Failed to save settings. Check terminal." };
  }
}