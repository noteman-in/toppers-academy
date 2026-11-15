"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { hashPassword } from "better-auth/crypto";

// Helper to verify Owner access
async function verifyOwner() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return false;
  
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  return user?.role === "OWNER";
}

export async function createAdminUser(formData: FormData) {
  if (!(await verifyOwner())) return { error: "Only the Owner can add users." };

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) return { error: "All fields are required" };

  try {
    await auth.api.signUpEmail({ body: { name, email, password } });
    revalidatePath("/admin/users");
    return { success: true, email, password }; 
  } catch (error: any) {
    return { error: error.message || "Failed to create user" };
  }
}

export async function deleteAdminUser(formData: FormData) {
  if (!(await verifyOwner())) return { error: "Unauthorized" };

  const id = formData.get("id") as string;
  const email = formData.get("email") as string;
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user.email === email) {
    return { error: "You cannot delete your own account." };
  }

  try {
    await prisma.user.delete({ where: { id } });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete user." };
  }
}

export async function updateUserPassword(formData: FormData) {
  if (!(await verifyOwner())) return { error: "Unauthorized" };

  const userId = formData.get("userId") as string;
  const newPassword = formData.get("newPassword") as string;

  if (!userId || !newPassword || newPassword.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  try {
    const hashedPassword = await hashPassword(newPassword);
    await prisma.account.updateMany({
      where: { userId: userId, providerId: "credential" },
      data: { password: hashedPassword },
    });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update password." };
  }
}