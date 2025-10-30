import React from "react";

const FilterBar = ({ category, setCategory, sort, setSort, isDark }) => {
  return (
    <aside
      className="border rounded-xl p-6 w-full sm:w-64 flex flex-col justify-start shadow-sm transition-colors duration-300"
      style={{
        backgroundColor: isDark ? "#1f2937" : "#ffffff",
        borderColor: isDark ? "#374151" : "#e5e7eb",
        color: isDark ? "#f9fafb" : "#111827",
      }}
    >
      {/* Header */}
      <h2
        className="font-semibold text-lg mb-6 text-left"
        style={{ color: isDark ? "#f9fafb" : "#111827" }}
      >
        Filters
      </h2>

      {/* Category Filter */}
      <div className="mb-5">
        <label
          htmlFor="category"
          className="block text-sm font-medium mb-1 text-left"
          style={{ color: isDark ? "#d1d5db" : "#374151" }}
        >
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          style={{
            backgroundColor: isDark ? "#111827" : "#ffffff",
            borderColor: isDark ? "#4b5563" : "#d1d5db",
            color: isDark ? "#f9fafb" : "#111827",
          }}
        >
          <option value="All">All</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
        </select>
      </div>

      {/* Sort By Filter */}
      <div>
        <label
          htmlFor="sort"
          className="block text-sm font-medium mb-1 text-left"
          style={{ color: isDark ? "#d1d5db" : "#374151" }}
        >
          Sort By
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          style={{
            backgroundColor: isDark ? "#111827" : "#ffffff",
            borderColor: isDark ? "#4b5563" : "#d1d5db",
            color: isDark ? "#f9fafb" : "#111827",
          }}
        >
          <option value="Default">Default</option>
          <option value="Low to High">Price: Low to High</option>
          <option value="High to Low">Price: High to Low</option>
          <option value="Highest">Highest Rated</option>
        </select>
      </div>
    </aside>
  );
};

export default FilterBar;

