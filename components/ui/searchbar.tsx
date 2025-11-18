"use client";
import React from "react";
import { Input } from "./input";
import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className="bg-black p-10   max-w-full object-contain">
      <div className="relative  p-4 flex">
        <Input
          className="w-full   bg-white  p-4 "
          placeholder="       search for products"
        />
        <Search className="z-20 absolute p-2" size={40} />
      </div>
    </div>
  );
}

export default SearchBar;
