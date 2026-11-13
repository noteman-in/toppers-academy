"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTest(formData: FormData) {
  const title = formData.get("title") as string;
  const subject = formData.get("subject") as string;
  const classLevel = formData.get("classLevel") as string;
  const timeLimit = parseInt(formData.get("timeLimit") as string);
  
  const questionsData = formData.get("questions") as string;
  const questions = JSON.parse(questionsData);

  if (!title || !subject || questions.length === 0) return;

  await prisma.test.create({
    data: {
      title,
      subject,
      classLevel,
      timeLimit,
      questions: {
        create: questions.map((q: any) => ({
          questionText: q.questionText,
          optionA: q.optionA,
          optionB: q.optionB,
          optionC: q.optionC,
          optionD: q.optionD,
          correctOption: q.correctOption,
        }))
      }
    }
  });

  revalidatePath("/admin/tests");
  redirect("/admin/tests");
}