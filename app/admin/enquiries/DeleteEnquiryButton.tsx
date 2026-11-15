"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteEnquiry } from "./actions";
import { toast } from "sonner";

export default function DeleteEnquiryButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Prevent standard form submission
    
    if (!window.confirm("Are you sure you want to delete this enquiry? This cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    const formData = new FormData();
    formData.append("id", id);

    const result = await deleteEnquiry(formData);
    
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Enquiry deleted successfully");
    }
    setIsDeleting(false);
  }

  return (
    <form onSubmit={handleDelete}>
      <button 
        type="submit" 
        disabled={isDeleting}
        className="flex items-center gap-1 text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors text-sm font-bold disabled:opacity-50"
      >
        <Trash2 className="w-4 h-4" /> {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </form>
  );
}