"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function createCourse(formData: FormData): Promise<{ success?: boolean; error?: string }> {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const classLevel = formData.get("classLevel") as string;
  const subject = formData.get("subject") as string;
  const purchaseUrl = formData.get("purchaseUrl") as string;
  const webPurchaseUrl = formData.get("webPurchaseUrl") as string;
  const price = formData.get("price") as string;
  const isFeatured = formData.get("isFeatured") === "on";
  const imageFile = formData.get("image") as File;

  if (!title || !description || !classLevel || !subject || !purchaseUrl) {
    return { error: "Please fill in all required fields." };
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  const imageUrl = await uploadToCloudinary(imageFile, "toppers_courses");

  await prisma.course.create({
    data: { title, slug, description, classLevel, subject, purchaseUrl, webPurchaseUrl, price, isFeatured, imageUrl },
  });

  revalidatePath("/admin/courses");
  revalidatePath("/");
  revalidatePath("/courses");
  return { success: true };
}

export async function deleteCourse(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.course.delete({ where: { id } });
  revalidatePath("/admin/courses");
  revalidatePath("/");
  revalidatePath("/courses");
}

export async function updateCourse(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const classLevel = formData.get("classLevel") as string;
  const subject = formData.get("subject") as string;
  const purchaseUrl = formData.get("purchaseUrl") as string;
  const webPurchaseUrl = formData.get("webPurchaseUrl") as string;
  const price = formData.get("price") as string;
  const isFeatured = formData.get("isFeatured") === "on";
  const imageFile = formData.get("image") as File;

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  const imageUrl = await uploadToCloudinary(imageFile, "toppers_courses");

  await prisma.course.update({
    where: { id },
    data: {
      title, slug, description, classLevel, subject, purchaseUrl, webPurchaseUrl, price, isFeatured,
      ...(imageUrl && { imageUrl }),
    },
  });

  revalidatePath("/admin/courses");
  revalidatePath("/");
  revalidatePath("/courses");

  const secretPath = process.env.NEXT_PUBLIC_ADMIN_PATH || 'ops-master-2026';
  redirect(`/${secretPath}/courses`);
}