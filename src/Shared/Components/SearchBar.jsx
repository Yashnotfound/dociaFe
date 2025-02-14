import React from "react";

const SearchBar = ({ searchBoxVisibility, toggleSearchBox }) => {
  return (
    <div className="relative w-full">
      {/* Search Box */}
      <div
        className={`absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-6 
                    md:border-0 md:relative md:inset-0 md:p-0 md:w-auto ${
                      searchBoxVisibility ? "block" : "hidden"
                    }`}
      >
        <input
          type="text"
          placeholder="Search"
          className="w-full md:w-auto bg-grey p-5 pl-8 pr-[15%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12 text-lg"
        />
        <i className="fi fi-rr-search absolute right-7 md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-2xl text-dark-grey"></i>
      </div>

      <button
        className="md:hidden bg-grey w-14 h-14 rounded-full flex items-center justify-center"
        onClick={toggleSearchBox}
      >
        <i className="fi fi-rr-search text-2xl"></i>
      </button>
    </div>
  );
};

export default SearchBar;
