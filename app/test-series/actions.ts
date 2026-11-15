"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitTestAttempt(data: { testId: string, name: string, phone: string, score: number, total: number }) {
  await prisma.testAttempt.create({
    data: {
      testId: data.testId,
      studentName: data.name,
      studentPhone: data.phone,
      score: data.score,
      totalQuestions: data.total,
    }
  });

  // This tells Next.js to clear the cache for the admin pages
  revalidatePath("/admin/results");
  revalidatePath("/admin");
}