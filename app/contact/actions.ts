"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitEnquiry(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !phone || !message) return;

  await prisma.enquiry.create({
    data: { name, email, phone, message },
  });

  revalidatePath("/admin/enquiries");
}