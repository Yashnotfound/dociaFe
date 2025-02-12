// src/components/SearchBar.js
import React from "react";

const SearchBar = ({ searchBoxVisibility, toggleSearchBox }) => {
  return (
    <div className="relative">
      {/* Search Box */}
      <div
        className={
          "absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto " +
          (searchBoxVisibility ? "show" : "hide")
        }
      >
        <input
          type="text"
          placeholder="Search"
          className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
        />
        <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
      </div>

      {/* Toggle Search Button */}
      <button
        className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center"
        onClick={toggleSearchBox}
      >
        <i className="fi fi-rr-search text-xl"></i>
      </button>
    </div>
  );
};

export default SearchBar;
