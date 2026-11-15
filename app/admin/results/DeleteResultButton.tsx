"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteResult } from "./actions";
import { toast } from "sonner";

export default function DeleteResultButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Prevent page reload

    // Safety confirmation
    if (!window.confirm("Are you sure you want to delete this test result? This cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    const formData = new FormData();
    formData.append("id", id);

    try {
      await deleteResult(formData);
      toast.success("Result deleted successfully");
    } catch (error) {
      toast.error("Failed to delete result");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <form onSubmit={handleDelete}>
      <button 
        type="submit" 
        disabled={isDeleting}
        className="flex items-center gap-1 text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg text-sm font-bold transition-colors disabled:opacity-50 cursor-pointer"
      >
        <Trash2 className="w-4 h-4" /> 
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </form>
  );
}