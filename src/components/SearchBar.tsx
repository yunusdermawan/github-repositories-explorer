// SearchBar.tsx
import React, { useState } from "react";

export interface SearchBarProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading }) => {
  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    const trimmedQuery = input.trim();
    if (trimmedQuery) {
      onSearch(trimmedQuery);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 my-4">
      <input
        type="text"
        placeholder="Search GitHub users..."
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-black"
      />
      <button
        onClick={handleSearch}
        disabled={loading}
        className="w-full sm:w-1/2 px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
};

export default SearchBar;
