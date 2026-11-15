import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { twoFactor } from "better-auth/plugins";
import { prisma } from "./prisma";

const ownerEmails = (process.env.OWNER_EMAILS || "").split(",").map(e => e.trim().toLowerCase());

export const auth = betterAuth({
  // 👇 1. ADD THIS: Explicitly set the base URL
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  
  // 👇 2. Ensure trustedOrigins is set correctly
  trustedOrigins: [
    process.env.BETTER_AUTH_URL || "http://localhost:3000",
  ],
  
  // --- THIS AUTOMATICALLY GIVES OWNER ROLE ---
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const isOwner = ownerEmails.includes(user.email.toLowerCase());
          return {
            data: {
              ...user,
              role: isOwner ? "OWNER" : "EDITOR",
            },
          };
        },
      },
    },
  },
  // -------------------------------------------

  plugins: [
    twoFactor({
      issuer: "Toppers Academy of Commerce",
    }),
  ],
});

export type Auth = typeof auth;