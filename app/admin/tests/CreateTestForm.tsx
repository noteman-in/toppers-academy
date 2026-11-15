"use client";
import { useState } from "react";
import { createTest } from "./actions";
import { Plus, Trash2, Save } from "lucide-react";

export default function CreateTestForm() {
  const [questions, setQuestions] = useState<any[]>([]);

  const addQuestion = () => {
    setQuestions([...questions, { questionText: "", optionA: "", optionB: "", optionC: "", optionD: "", correctOption: "A" }]);
  };

  const removeQuestion = (index: number) => {
    const newQ = [...questions];
    newQ.splice(index, 1);
    setQuestions(newQ);
  };

  const updateQuestion = (index: number, field: string, value: string) => {
    const newQ = [...questions];
    newQ[index][field] = value;
    setQuestions(newQ);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit">
      <h2 className="text-xl font-bold text-brand-dark mb-4">Create New Test</h2>
      <form action={createTest} className="space-y-4">
        <div className="space-y-4 pb-4 border-b border-slate-100">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Test Title</label>
            <input type="text" name="title" required className="w-full px-4 py-2 border rounded-xl" placeholder="e.g. Accountancy Mock Test 1" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Subject</label>
              <input type="text" name="subject" required className="w-full px-4 py-2 border rounded-xl" placeholder="Accountancy" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Class</label>
              <input type="text" name="classLevel" required className="w-full px-4 py-2 border rounded-xl" placeholder="Class 12" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Time (Mins)</label>
              <input type="number" name="timeLimit" required className="w-full px-4 py-2 border rounded-xl" placeholder="60" />
            </div>
          </div>
        </div>

        <input type="hidden" name="questions" value={JSON.stringify(questions)} />

        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {questions.map((q, i) => (
            <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative">
              <button type="button" onClick={() => removeQuestion(i)} className="absolute top-3 right-3 text-red-500 hover:text-red-700">
                <Trash2 className="w-4 h-4" />
              </button>
              <h3 className="font-bold text-sm text-brand-dark mb-3">Question {i + 1}</h3>
              
              <input type="text" placeholder="Question text" value={q.questionText} onChange={(e) => updateQuestion(i, "questionText", e.target.value)} required className="w-full px-3 py-2 border rounded-lg mb-3 text-sm" />
              
              <div className="grid grid-cols-2 gap-2">
                {["A", "B", "C", "D"].map((opt) => (
                  <div key={opt} className="flex items-center gap-2">
                    <span className="font-bold text-slate-400 text-xs">{opt}.</span>
                    <input type="text" placeholder={`Option ${opt}`} value={q[`option${opt}`]} onChange={(e) => updateQuestion(i, `option${opt}`, e.target.value)} required className="w-full px-3 py-1.5 border rounded-lg text-sm" />
                  </div>
                ))}
              </div>

              <div className="mt-3">
                <label className="block text-xs font-bold text-slate-700 mb-1">Correct Answer</label>
                <select value={q.correctOption} onChange={(e) => updateQuestion(i, "correctOption", e.target.value)} className="px-3 py-1.5 border rounded-lg bg-white text-sm font-bold text-green-600 w-full">
                  <option value="A">Option A</option>
                  <option value="B">Option B</option>
                  <option value="C">Option C</option>
                  <option value="D">Option D</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
          <button type="button" onClick={addQuestion} className="w-full bg-slate-100 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" /> Add Another Question
          </button>
          <button type="submit" disabled={questions.length === 0} className="w-full bg-brand-primary text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-50">
            <Save className="w-5 h-5" /> Publish Test
          </button>
        </div>
      </form>
    </div>
  );
}