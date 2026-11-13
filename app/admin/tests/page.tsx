"use client";
import { useState } from "react";
import { createTest } from "./actions";
import { Plus, Trash2, Save } from "lucide-react";

export default function CreateTestPage() {
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
    <div className="p-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-brand-dark mb-8">Create New Test</h1>
      
      <form action={createTest} className="space-y-6">
        {/* Test Details */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
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
              <label className="block text-sm font-bold text-slate-700 mb-1">Time Limit (Mins)</label>
              <input type="number" name="timeLimit" required className="w-full px-4 py-2 border rounded-xl" placeholder="60" />
            </div>
          </div>
        </div>

        {/* Hidden input to pass questions JSON to server action */}
        <input type="hidden" name="questions" value={JSON.stringify(questions)} />

        {/* Questions List */}
        <div className="space-y-6">
          {questions.map((q, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative">
              <button type="button" onClick={() => removeQuestion(i)} className="absolute top-4 right-4 text-red-500 hover:text-red-700">
                <Trash2 className="w-5 h-5" />
              </button>
              <h3 className="font-bold text-brand-dark mb-4">Question {i + 1}</h3>
              
              <input type="text" placeholder="Question text" value={q.questionText} onChange={(e) => updateQuestion(i, "questionText", e.target.value)} required className="w-full px-4 py-2 border rounded-xl mb-4 font-medium" />
              
              <div className="grid grid-cols-2 gap-4">
                {["A", "B", "C", "D"].map((opt) => (
                  <div key={opt} className="flex items-center gap-2">
                    <span className="font-bold text-slate-400">{opt}.</span>
                    <input type="text" placeholder={`Option ${opt}`} value={q[`option${opt}`]} onChange={(e) => updateQuestion(i, `option${opt}`, e.target.value)} required className="w-full px-4 py-2 border rounded-xl text-sm" />
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-bold text-slate-700 mb-1">Correct Answer</label>
                <select value={q.correctOption} onChange={(e) => updateQuestion(i, "correctOption", e.target.value)} className="px-4 py-2 border rounded-xl bg-slate-50 font-bold text-green-600">
                  <option value="A">Option A</option>
                  <option value="B">Option B</option>
                  <option value="C">Option C</option>
                  <option value="D">Option D</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button type="button" onClick={addQuestion} className="flex-1 bg-slate-200 text-slate-800 py-4 rounded-xl font-bold hover:bg-slate-300 transition-colors flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" /> Add Another Question
          </button>
          <button type="submit" disabled={questions.length === 0} className="flex-1 bg-brand-primary text-white py-4 rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-50">
            <Save className="w-5 h-5" /> Publish Test
          </button>
        </div>
      </form>
    </div>
  );
}