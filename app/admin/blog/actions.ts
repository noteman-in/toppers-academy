"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createBlogPost(formData: FormData) {
  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;

  if (!title || !excerpt || !content) return;

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  await prisma.blogPost.create({
    data: { title, slug, excerpt, content },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function deleteBlogPost(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.blogPost.delete({ where: { id } });
  
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}