import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

const Category_list = () => {
  const [Categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/category-list`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Fetch error Category:", error);
        setError("Failed to fetch categories.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategory();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <p className="text-xl font-semibold text-gray-500">
          Loading categories...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        <p className="text-xl font-semibold">Error: {error}</p>
      </div>
    );
  }

  if (!Categories || Categories.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p className="text-xl font-medium">No categories found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Shop by Category
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {Categories.map((category, index) => (
          <Link key={index} to={`/category/${category}`} className="block">
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 h-24 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-200 transform hover:scale-[1.02] cursor-pointer border border-gray-100"
            >
              <h2 className="text-base font-semibold text-center text-gray-800">
                {category}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category_list;
