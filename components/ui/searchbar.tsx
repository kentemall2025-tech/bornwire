"use client";
import React from "react";
import { Input } from "./input";
import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className="bg-black p-4   max-w-full object-contain w-full">
      <div className="relative  p-4 flex items-center  w-full ">
        <Input
          className="w-full   bg-white  p-8 pl-14 "
          placeholder="search for products"
        />
        <Search className="z-20 absolute p-2 ml-2" size={40} />
      </div>
    </div>
  );
}

export default SearchBar;
