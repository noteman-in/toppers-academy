import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { path } = await req.json();
    
    // Ignore admin routes and api routes
    if (path && !path.startsWith("/admin") && !path.startsWith("/api")) {
      await prisma.pageView.create({ data: { path } });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}