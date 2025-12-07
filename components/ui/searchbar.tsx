"use client";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "./input";

import React, { useState, useEffect, useRef } from "react";

interface SearchBarProps {
  products: any[];
}
export default function SearchBar({ products }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!query) return;

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      router.push(`/results?query=${encodeURIComponent(query)}`);
    }, 500);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      router.push(`/results?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="bg-black p-4 w-full">
      <div className="relative p-4 flex items-center w-full">
        <Search className="absolute left-8 text-gray-500" size={28} />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-white py-6 pl-16 text-lg"
          placeholder="Search for products…"
        />
      </div>
    </div>
  );
}
