import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import TestInterface from "@/components/TestInterface";
import { notFound } from "next/navigation";

export default async function TakeTestPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const test = await prisma.test.findUnique({
    where: { id: resolvedParams.id },
    include: { questions: true }
  });

  if (!test) notFound();

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F9] bg-dot-pattern">
      <Header />
      <main className="flex-grow pt-28 pb-24">
        <TestInterface test={test} />
      </main>
      <Footer />
    </div>
  );
}