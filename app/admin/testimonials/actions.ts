"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTestimonial(formData: FormData) {
  const name = formData.get("name") as string;
  const course = formData.get("course") as string;
  const review = formData.get("review") as string;

  if (!name || !course || !review) return;

  await prisma.testimonial.create({
    data: {
      name,
      course,
      review,
      isVerified: true,
    },
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}