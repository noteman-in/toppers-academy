"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

async function saveImage(imageFile: File): Promise<string | null> {
  if (!imageFile || imageFile.size === 0) return null;
  
  try {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uniqueName = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.]/g, "")}`;
    const uploadDir = path.join(process.cwd(), "public/uploads");
    const filePath = path.join(uploadDir, uniqueName);
    
    // Ensure the folder exists
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(filePath, buffer);
    
    return `/uploads/${uniqueName}`;
  } catch (error) {
    console.error("Failed to save image:", error);
    return null;
  }
}

export async function createCourse(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const classLevel = formData.get("classLevel") as string;
  const subject = formData.get("subject") as string;
  const purchaseUrl = formData.get("purchaseUrl") as string;
  const isFeatured = formData.get("isFeatured") === "on";
  const imageFile = formData.get("image") as File;

  if (!title || !description || !classLevel || !subject || !purchaseUrl) {
    return { error: "Please fill in all required fields." };
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  const imageUrl = await saveImage(imageFile);

  if (!imageUrl) {
     return { error: "Failed to upload image." };
  }

  try {
    await prisma.course.create({
      data: { title, slug, description, classLevel, subject, purchaseUrl, isFeatured, imageUrl },
    });

    revalidatePath("/admin/courses");
    revalidatePath("/");
    revalidatePath("/courses");
    return { success: true };
  } catch (error) {
    return { error: "Failed to save course to database." };
  }
}

export async function deleteCourse(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.course.delete({ where: { id } });
  revalidatePath("/admin/courses");
  revalidatePath("/");
  revalidatePath("/courses");
}