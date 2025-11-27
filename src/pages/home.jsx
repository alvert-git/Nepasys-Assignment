import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import axios from "axios";
import { OrbitProgress, ThreeDot } from "react-loading-indicators";
import ProductDetails from "../components/ProductDetails";
import Filter from "../components/Filter";
import Category_list from "../components/Category_list";

const home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchHighRated = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/products/search?q=phone&limit=8&select=title,price,thumbnail,rating`
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error("Fetch error:", err);
        setError(err.message || "An error occurred.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchHighRated();
  }, []);


  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center text-2xl">
        <OrbitProgress color="#32cd32" size="large" />
        <p className="text-xl font-bold">Loading...</p>
      </div>
    );
  }
  return (
    <>
      <Hero />
      
      <Category_list/>
      <h2 className="text-4xl text-center font-bold mb-4 text-gray-800 mt-10 mb-10">
        Features Products
      </h2>
      <ProductGrid products={products} />
     
    </>
  );
};

export default home;
