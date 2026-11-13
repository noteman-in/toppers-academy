"use client";
import { submitEnquiry } from "./actions";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    await submitEnquiry(new FormData(e.currentTarget));
    setIsLoading(false);
    setIsSuccess(true);
  }

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
        <button onClick={() => setIsSuccess(false)} className="text-brand-primary font-bold mt-4 hover:underline">Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
      <input type="text" name="name" required placeholder="Name" className="w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-brand-primary" />
      <input type="email" name="email" required placeholder="Email" className="w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-brand-primary" />
      <input type="tel" name="phone" required placeholder="Phone" className="w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-brand-primary" />
      <textarea name="message" required rows={4} placeholder="Message" className="w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-brand-primary" />
      <button type="submit" disabled={isLoading} className="w-full bg-brand-primary text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors disabled:opacity-50">
        {isLoading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}