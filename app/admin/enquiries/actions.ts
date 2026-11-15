"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function deleteEnquiry(formData: FormData) {
  // 1. Security Check: Ensure user is logged in
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { error: "Unauthorized" };
  }

  const id = formData.get("id") as string;
  if (!id) {
    return { error: "Enquiry ID is required" };
  }

  try {
    // 2. Delete from database
    await prisma.enquiry.delete({ where: { id } });
    
    // 3. Refresh the page data
    revalidatePath("/admin/enquiries");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete enquiry" };
  }
}