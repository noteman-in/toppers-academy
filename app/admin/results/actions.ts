"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteResult(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;

  await prisma.testAttempt.delete({ where: { id } });
  
  revalidatePath("/admin/results");
  revalidatePath("/admin"); // To update the dashboard stats
}