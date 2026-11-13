"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

async function saveFile(file: File): Promise<string | null> {
  if (!file || file.size === 0) return null;
  
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uniqueName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "")}`;
  const uploadDir = path.join(process.cwd(), "public/uploads");
  const filePath = path.join(uploadDir, uniqueName);
  
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(filePath, buffer);
  
  return `/uploads/${uniqueName}`;
}

export async function uploadResource(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const classLevel = formData.get("classLevel") as string;
  const subject = formData.get("subject") as string;
  const file = formData.get("file") as File;

  if (!title || !description || !classLevel || !subject || !file) return;

  const fileUrl = await saveFile(file);
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