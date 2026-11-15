"use client";
import { useState, useEffect } from "react";
import { submitTestAttempt } from "@/app/test-series/actions";
import { Clock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function TestInterface({ test }: { test: any }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [student, setStudent] = useState({ name: "", phone: "" });
  const [timeLeft, setTimeLeft] = useState(test.timeLimit * 60);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number, total: number } | null>(null);

  // --- NEW: Warning before leaving the page ---
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Only show warning if the test has started, is NOT finished, and is NOT submitting
      if (hasStarted && !result && !isSubmitting) {
        e.preventDefault();
        e.returnValue = ""; // Required for Chrome/Edge to show the prompt
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    
    // Cleanup: remove listener when component unmounts
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasStarted, result, isSubmitting]);
  // -------------------------------------------

  // Timer Logic
  useEffect(() => {
    if (!hasStarted || result || isSubmitting) return;
    const timer = setInterval(() => {
      setTimeLeft((prev: number) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [hasStarted, result, isSubmitting]);

  // Auto-submit when time hits 0
  useEffect(() => {
    if (timeLeft === 0 && hasStarted && !result && !isSubmitting) {
      toast.error("Time is up! Auto-submitting your test.");
      submitTest();
    }
  }, [timeLeft, hasStarted, result, isSubmitting]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!student.name.trim()) return toast.error("Please enter your name");
    
    // Validate Indian Mobile Number (10 digits, starts with 6-9)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(student.phone)) {
      return toast.error("Please enter a valid 10-digit mobile number");
    }

    setHasStarted(true);
  };

  const submitTest = async () => {
    setIsSubmitting(true);
    let score = 0;
    test.questions.forEach((q: any) => {
      if (answers[q.id] === q.correctOption) score++;
    });

    try {
      await submitTestAttempt({
        testId: test.id,
        name: student.name,
        phone: student.phone,
        score: score,
        total: test.questions.length
      });
      setResult({ score, total: test.questions.length });
    } catch (error) {
      toast.error("Failed to submit test");
    }
    setIsSubmitting(false);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!hasStarted) {
    return (
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-200 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-brand-dark mb-2">Ready to start?</h2>
        <p className="text-slate-500 mb-6">Please enter your details to begin the {test.title}.</p>
        <form onSubmit={handleStart} className="space-y-4">
          <input type="text" placeholder="Your Full Name" required value={student.name} onChange={e => setStudent({...student, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-brand-primary" />
          <input type="tel" placeholder="10-Digit Mobile Number" required maxLength={10} value={student.phone} onChange={e => setStudent({...student, phone: e.target.value.replace(/\D/g, '')})} className="w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-brand-primary" />
          <button type="submit" className="w-full bg-brand-primary text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-md">
            Start Test
          </button>
        </form>
      </div>
    );
  }

  if (result) {
    return (
      <div className="bg-white p-12 rounded-3xl shadow-xl border border-slate-200 max-w-md mx-auto text-center">
        <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-brand-dark mb-2">Test Completed!</h2>
        <p className="text-slate-500 mb-6">Well done, {student.name}. Your responses have been recorded.</p>
        <div className="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-200">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Your Score</p>
          <p className="text-5xl font-extrabold text-brand-primary">{result.score} <span className="text-2xl text-slate-400">/ {result.total}</span></p>
        </div>
        <Link href="/test-series" className="bg-brand-dark text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">
          Back to Tests
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center mb-8 sticky top-24 z-10">
        <div>
          <h2 className="font-bold text-brand-dark text-lg">{test.title}</h2>
          <p className="text-xs font-bold text-slate-400">{test.subject} • {test.classLevel}</p>
        </div>
        <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold">
          <Clock className="w-5 h-5" /> {formatTime(timeLeft)}
        </div>
      </div>

      <div className="space-y-6">
        {test.questions.map((q: any, i: number) => (
          <div key={q.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-brand-dark mb-4">Q{i + 1}. {q.questionText}</h3>
            <div className="grid gap-3">
              {["A", "B", "C", "D"].map((opt) => (
                <label key={opt} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${answers[q.id] === opt ? "bg-brand-primary/10 border-brand-primary" : "border-slate-200 hover:bg-slate-50"}`}>
                  <input type="radio" name={q.id} value={opt} checked={answers[q.id] === opt} onChange={() => setAnswers({...answers, [q.id]: opt})} className="w-4 h-4 text-brand-primary" />
                  <span className="text-slate-700 font-medium">{q[`option${opt}`]}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button onClick={submitTest} disabled={isSubmitting} className="w-full mt-8 bg-brand-primary text-white py-4 rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-lg disabled:opacity-50">
        {isSubmitting ? "Submitting..." : "Submit Test"}
      </button>
    </div>
  );
}