"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BlogSearchInput() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/blog/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative mb-10">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search blogs..."
        className="w-full bg-[#f2f2f2] dark:bg-white/10 rounded-full py-3 pl-6 pr-12 text-sm text-black dark:text-white outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-[#00ff00]/50"
      />
      <button type="submit" className="absolute right-5 top-1/2 -translate-y-1/2 text-blue-400 dark:text-blue-300" aria-label="Search">
        <Search className="w-4 h-4 hover:text-[#00ff00] transition-colors" />
      </button>
    </form>
  );
}
