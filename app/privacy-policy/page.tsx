import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F9]"><Header />
      <main className="flex-grow pt-32 pb-24 max-w-4xl mx-auto px-4 w-full">
        <h1 className="text-4xl font-extrabold text-brand-dark mb-8">Privacy Policy</h1>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6 text-slate-600">
          <p>Your privacy is important to us. We collect student data (name, email, phone) strictly for the purpose of communication and course delivery.</p>
          <p>We do not sell your data to third parties. For any data removal requests, please contact us.</p>
        </div>
      </main><Footer />
    </div>
  );
}