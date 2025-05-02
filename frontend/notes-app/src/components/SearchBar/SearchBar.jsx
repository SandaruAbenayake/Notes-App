import React from "react";
import { FaSearch } from "react-icons/fa"; // Correct icon for search
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search Notes"
        className="w-full text-base bg-transparent py-[11px] outline-none"
      />

      {value && (
        <IoMdClose
          className="text-xl text-gray-600 cursor-pointer hover:text-black mr-3"
          onClick={onClearSearch}
        />
      )}

      <FaSearch
        onClick={handleSearch}
        className="text-xl text-gray-600 cursor-pointer ml-2"
      />
    </div>
  );
};

export default SearchBar;
