"use client";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteTestimonial } from "./actions";
import { toast } from "sonner";

export default function DeleteButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;

    setIsDeleting(true);
    const formData = new FormData();
    formData.append("id", id);

    await deleteTestimonial(formData);
    toast.success("Testimonial deleted");
    setIsDeleting(false);
  }

  return (
    <form onSubmit={handleDelete}>
      <button type="submit" disabled={isDeleting} className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors disabled:opacity-50">
        <Trash2 className="w-3 h-3" /> {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </form>
  );
}