import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel handles the build output automatically.
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;