import React from "react";
import { Input } from "./input";
import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className=" h-20  max-w-full">
      <div className="relative bg-black p-4 flex">
        <Input
          className="w-full  bg-white  p-4 "
          placeholder="        search for products"
        />
        <Search className="z-20 absolute p-2" size={40} />
      </div>
    </div>
  );
}

export default SearchBar;
