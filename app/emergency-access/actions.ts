"use server";

import { prisma } from "@/lib/prisma";
import { hashPassword } from "better-auth/crypto"; // <-- We use Better Auth's internal hasher

export async function resetAdminPassword(formData: FormData) {
  const masterKey = formData.get("masterKey") as string;
  const newPassword = formData.get("newPassword") as string;
  const email = formData.get("email") as string;

  // 1. Verify the secret key matches the server environment variable
  if (masterKey !== process.env.EMERGENCY_MASTER_KEY) {
    return { error: "Invalid Master Key." };
  }

  if (newPassword.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  try {
    // 2. Find the user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { error: "Admin email not found." };
    }

    // 3. Hash the new password using Better Auth's own algorithm
    const hashedPassword = await hashPassword(newPassword);

    // 4. Update the password directly in the Account table
    await prisma.account.update({
      where: {
        id: (
          await prisma.account.findFirst({
            where: { userId: user.id, providerId: "credential" },
          })
        )?.id,
      },
      data: { password: hashedPassword },
    });

    return { success: true };
  } catch (error) {
    console.error("Emergency reset failed:", error);
    return { error: "Failed to reset password. Check server logs." };
  }
}