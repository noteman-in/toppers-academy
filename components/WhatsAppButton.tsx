import { MessageCircle } from "lucide-react";

export default function WhatsAppButton({ phoneNumber }: { phoneNumber: string }) {
  // This regex removes all non-numeric characters (like +, spaces, or dashes)
  const cleanNumber = (phoneNumber || "919285019461").replace(/\D/g, '');

  return (
    <a
      href={`https://wa.me/${cleanNumber}?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20the%20courses.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
    </a>
  );
}