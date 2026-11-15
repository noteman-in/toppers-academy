"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense, useEffect } from "react";

function SearchBarContent({ placeholder }: { placeholder?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  // Sync state if the URL changes externally
  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (query.trim()) {
      params.set("q", query.trim());
    } else {
      params.delete("q");
    }
    
    // Just push the new URL, Next.js will handle the dynamic re-fetch
    router.push(`?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md">
      <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder || "Search..."}
        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none shadow-sm transition-all"
      />
    </form>
  );
}

export default function SearchBar({ placeholder }: { placeholder?: string }) {
  return (
    <Suspense fallback={<div className="w-full max-w-md h-12 bg-slate-100 animate-pulse rounded-xl border border-slate-200"></div>}>
      <SearchBarContent placeholder={placeholder} />
    </Suspense>
  );
}