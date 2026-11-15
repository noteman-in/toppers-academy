"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTestimonial(formData: FormData) {
  const name = formData.get("name") as string;
  const course = formData.get("course") as string;
  const review = formData.get("review") as string;

  if (!name || !course || !review) return;

  await prisma.testimonial.create({
    data: { name, course, review, isVerified: true },
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function deleteTestimonial(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.testimonial.delete({ where: { id } });
  
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function updateTestimonial(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const course = formData.get("course") as string;
  const review = formData.get("review") as string;

  if (!id || !name || !course || !review) return;

  await prisma.testimonial.update({
    where: { id },
    data: { name, course, review },
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}