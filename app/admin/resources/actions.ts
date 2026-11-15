"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function uploadResource(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const classLevel = formData.get("classLevel") as string;
  const subject = formData.get("subject") as string;
  const file = formData.get("file") as File;

  if (!title || !description || !classLevel || !subject || !file) return;

  const fileUrl = await uploadToCloudinary(file, "toppers_resources");
  if (!fileUrl) return;

  await prisma.resource.create({
    data: { title, description, classLevel, subject, fileUrl },
  });

  revalidatePath("/admin/resources");
  revalidatePath("/free-resources");
}

export async function deleteResource(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.resource.delete({ where: { id } });
  
  revalidatePath("/admin/resources");
  revalidatePath("/free-resources");
}