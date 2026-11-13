import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F9]"><Header />
      <main className="flex-grow pt-32 pb-24 max-w-4xl mx-auto px-4 w-full">
        <h1 className="text-4xl font-extrabold text-brand-dark mb-8">Terms & Conditions</h1>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6 text-slate-600">
          <p>By using this website, you agree to our terms. All course materials provided are the intellectual property of Toppers Academy of Commerce.</p>
          <p>Course purchases are handled via our official mobile app, subject to its own terms of service.</p>
        </div>
      </main><Footer />
    </div>
  );
}