import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useCategories } from "../hooks/useProducts";

const ProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams(); //
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || ""
  );

  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();

  const currentCategory = searchParams.get("category") || "";
  const currentSearch = searchParams.get("search") || "";

  // Update URL parameters
  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams); // Create a copy of the current search params.

    if (value && value.trim() !== "") {
      params.set(key, value); // Set or update the parameter
      params.delete("page"); // Reset to page 1 when filters change
    } else {
      params.delete(key); // Remove the parameter if value is empty
    }

    // Only reset to page 1 when filters actually changed AND resetPage is true
    // if (resetPage) {
    //   // Reset to page 1 when filters change
    //   params.delete("page");
    // }

    setSearchParams(params);
  };

  // Debounce search input
  useEffect(() => {
    // Only update if search input is different from current URL search
    const trimmedInput = searchInput.trim();
    const trimmedCurrent = currentSearch.trim();
    
    if (trimmedInput !== trimmedCurrent) {
      const timer = setTimeout(() => {
        const params = new URLSearchParams(searchParams);

        // Only update if the value actually changes
        if (trimmedInput !== "") {
          params.set("search", trimmedInput);
        } else {
          params.delete("search");
        }

        // Reset to page 1 when search changes
        params.delete("page");
        setSearchParams(params);
      }, 500); // 500ms delay for debounce

      return () => clearTimeout(timer);
    }
  }, [searchInput, currentSearch, searchParams, setSearchParams]);

  // Handle category change
  const handleCategoryChange = (category) => {
    updateFilter("category", category);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchInput("");
    setSearchParams({}); // Clear all URL params
  };

  // Check if any filters are active
  const hasActiveFilters = currentCategory || currentSearch;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Search Input */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={handleSearchChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            {searchInput && (
              <button
                onClick={() => setSearchInput("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg
                  className="h-5 w-5 text-gray-400 hover:text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-4">
          <div className="min-w-0 flex-1 lg:flex-none">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              value={currentCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              disabled={categoriesLoading}
              className="block w-full lg:w-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="self-end px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-sm text-gray-600">Active filters:</span>

          {currentSearch && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              Search: "{currentSearch}"
              <button
                onClick={() => {
                  setSearchInput("");
                  updateFilter("search", "");
                }}
                className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full text-indigo-400 hover:text-indigo-600"
              >
                ×
              </button>
            </span>
          )}

          {currentCategory && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Category:{" "}
              {currentCategory.charAt(0).toUpperCase() +
                currentCategory.slice(1)}
              <button
                onClick={() => handleCategoryChange("")}
                className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full text-green-400 hover:text-green-600"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductFilters;
