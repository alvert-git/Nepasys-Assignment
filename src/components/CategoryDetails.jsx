import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductGrid from "./ProductGrid";

const CategoryDetails = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
        const fetchCategoryProducts = async () => {
            setIsLoading(true);
            setError(null);
            try {
                
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/products/category/${name}`
                );
                setProducts(response.data.products || []);
            } catch (err) {
                console.error("Fetch error for category:", err);
                setError(`Could not load products for ${formatCategoryName(name)}.`);
            } finally {
                setIsLoading(false);
            }
        };

        if (name) {
            fetchCategoryProducts();
        }
    }, [name]);

  return (
    <div className="max-w-7xl mx-auto my-10">
        <h2 className="text-4xl text-center font-bold mb-4 text-gray-800 mt-10 mb-10">
       {`Categories of ${name}`}
      </h2>
        <ProductGrid products={products} />
    </div>

  )
};

export default CategoryDetails;
