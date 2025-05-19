import React, { useState } from "react";
import Profileinfo from "../Cards/Profileinfo";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = (userIfo) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const onLogout = () => {
    localStorage.clear()
    navigate("/login");
    
  };

  const handleSearch = () => {
    console.log("Searching for:", searchValue);
    // Implement actual search logic here
  };

  const onClearSearch = () => {
    setSearchValue(""); // Clears the search input
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value); // Update the search value as user types
  };

  return (
    <>
      <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
        <h2 className="text-xl font-medium text-black py-2">Notes</h2>

        {/* Pass the necessary props to SearchBar */}
        <SearchBar
          value={searchValue}
          onChange={handleSearchChange}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />

        <Profileinfo userInfo={userIfo} onLogout={onLogout} />
      </div>
    </>
  );
};

export default Navbar;
