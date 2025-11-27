import React, { useEffect, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import axios from "axios";

const Filter = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  categories,
  setCategories,
}) => {
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/category-list`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Fetch error Category:", error);
      }
    };
    fetchCategory();
  }, []);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="max-w-7xl  mx-auto my-5 ">
      <div className="p-6 rounded-2xl ">
        <div className="flex flex-col md:flex-row md:items-start justify-between space-y-6 md:space-y-0 md:space-x-4">
          <div className="relative w-full md:w-1/3 flex-grow">
            <label
              htmlFor="search-input"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Search Products
            </label>
            <Search className="absolute left-4 top-1/2 mt-4 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="search-input"
              type="text"
              placeholder="Search by product title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded bg-white text-gray-700 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 shadow-sm hover:shadow-md"
            />
          </div>

          <div className="relative w-full md:w-1/4 flex-shrink-0">
            <label
              htmlFor="category-select"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded appearance-none bg-white text-gray-700 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 shadow-sm hover:shadow-md pr-10"
            >
              <option value="">All Categories</option>{" "}
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 mt-4 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative w-full md:w-1/4 flex-shrink-0">
            <label
              htmlFor="sort-select"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Sort By
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={handleSortChange}
              className="w-full p-3 border border-gray-300 rounded appearance-none bg-white text-gray-700 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 shadow-sm hover:shadow-md pr-10"
            >
              <option value="none">Default Sort</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Rating: High to Low</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 mt-4 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
