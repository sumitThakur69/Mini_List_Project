import React, { useState } from "react";
import { Search, Moon, Sun } from "lucide-react";

const Navbar = ({ onSearch, searchQuery, isDark, toggleDarkMode }) => {
  const [localSearch, setLocalSearch] = useState(searchQuery || "");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <header
  className="border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-3 shadow-sm sticky top-0 z-10 transition-colors"
  style={{
    backgroundColor: isDark ? '#111827' : '#ffffff',
    borderColor: isDark ? '#374151' : '#e5e7eb',
  }}
>
  {/* Title */}
  <h1
    className="text-lg sm:text-xl font-bold text-center sm:text-left"
    style={{ color: isDark ? '#ffffff' : '#111827' }}
  >
    Product Explorer
  </h1>

  {/* Search + Dark Mode Button container */}
  <div className="flex items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">
    {/* Search Bar */}
    <div className="relative flex-1 sm:flex-none max-w-xs">
      <Search
        size={16}
        className="absolute left-3 top-2.5 pointer-events-none"
        style={{ color: isDark ? '#9ca3af' : '#9ca3af' }}
      />
      <input
        type="text"
        placeholder="Search products..."
        value={localSearch}
        onChange={handleSearchChange}
        className="pl-9 pr-3 py-2 w-full border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors"
        style={{
          backgroundColor: isDark ? '#1f2937' : '#ffffff',
          borderColor: isDark ? '#4b5563' : '#d1d5db',
          color: isDark ? '#ffffff' : '#111827',
        }}
      />
    </div>

    {/* Dark mode toggle */}
    <button
      onClick={toggleDarkMode}
      className="p-2.5 rounded-lg border transition-all duration-200 hover:scale-105 flex-shrink-0"
      style={{
        backgroundColor: isDark ? '#1f2937' : '#ffffff',
        borderColor: isDark ? '#4b5563' : '#d1d5db',
      }}
      aria-label="Toggle dark mode"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDark ? (
        <Sun
          size={18}
          className="text-yellow-400 transition-transform hover:rotate-90"
        />
      ) : (
        <Moon
          size={18}
          className="text-gray-700 transition-transform hover:rotate-12"
        />
      )}
    </button>
  </div>
</header>

  );
};

export default Navbar;
