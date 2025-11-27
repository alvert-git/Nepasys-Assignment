import React, { useEffect, useState, useCallback, useRef } from "react";
import Filter from "./Filter";
import axios from "axios";
import { ThreeDot } from "react-loading-indicators";
import ProductGrid from "./ProductGrid";

const PAGE_LIMIT = 20;

const ProductCatalog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("none");
  const [categories, setCategories] = useState([]);

  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const loader = useRef(null);
  const observer = useRef(null);

  const fetchProducts = useCallback(
    async (currentSkip, isNewSearch = false) => {
      if (!hasMore && !isNewSearch) return;

      setIsLoading(true);
      setError(null);

      let endpoint = `${import.meta.env.VITE_API_URL}/products`;
      let isCategoryFetch = false;

      if (selectedCategory) {
        endpoint = `${
          import.meta.env.VITE_API_URL
        }/products/category/${selectedCategory}`;
        isCategoryFetch = true;
      } else if (searchQuery) {
        endpoint = `${
          import.meta.env.VITE_API_URL
        }/products/search?q=${searchQuery}`;
      }

      let sortQuery = "";
      if (sortBy !== "none") {
        const [field, order] = sortBy.split("-");
        sortQuery = `&sortBy=${field}&order=${order}`;
      }

      let finalUrl;

      if (isCategoryFetch) {
        finalUrl = `${endpoint}?select=title,price,thumbnail,rating,discountPercentage${sortQuery}`;
      } else {
        const separator = endpoint.includes("?") ? "&" : "?";
        finalUrl = `${endpoint}${separator}limit=${PAGE_LIMIT}&skip=${currentSkip}&select=title,price,thumbnail,rating,discountPercentage${sortQuery}`;
      }

      try {
        const response = await axios.get(finalUrl);
        const data = response.data;
        const fetchedProducts = data.products;

        if (isCategoryFetch) {
          setProducts(fetchedProducts);
          setTotal(fetchedProducts.length);
          setSkip(fetchedProducts.length);
          setHasMore(false);
        } else {
          setTotal(data.total);
          setProducts((prevProducts) =>
            isNewSearch
              ? fetchedProducts
              : [...prevProducts, ...fetchedProducts]
          );
          setHasMore(data.total > currentSkip + fetchedProducts.length);
          setSkip(currentSkip + fetchedProducts.length);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "An error occurred while fetching products.");
        setHasMore(false);
      } finally {
        setIsLoading(false);
        setIsInitialLoad(false);
      }
    },
    [searchQuery, selectedCategory, sortBy, hasMore]
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setProducts([]);
      setSkip(0);
      setTotal(0);
      setHasMore(true);
      setIsInitialLoad(true);

      fetchProducts(0, true);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, selectedCategory, sortBy]);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          fetchProducts(skip);
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) {
      observer.current.observe(loader.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [hasMore, isLoading, skip, fetchProducts]);

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center text-red-600">
        <p className="text-xl font-semibold">Error: {error}</p>
        <p className="text-gray-500">
          Please check your network connection or API URL.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Filter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
        setCategories={setCategories}
      />

      {isLoading && products.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-xl shadow-lg m-6">
          <ThreeDot
            color="#4f46e5"
            size="medium"
            text="Loading initial products..."
            textColor="#4f46e5"
          />
        </div>
      ) : (
        <>
          <ProductGrid products={products} />

          {hasMore && (
            <div ref={loader} className="py-8 text-center">
              {isLoading && (
                <ThreeDot
                  color="#32cd32"
                  size="small"
                  text="Loading more..."
                  textColor="black"
                />
              )}
              {!isLoading && products.length > 0 && (
                <p className="text-gray-500">
                  Scroll down to load more products...
                </p>
              )}
            </div>
          )}

          {!hasMore && products.length > 0 && (
            <div className="py-8 text-center">
              <p className="text-gray-500 font-medium">
                You have reached the end of the product catalog (
                {products.length} of {total} items).
              </p>
            </div>
          )}

          {products.length === 0 && !isLoading && !isInitialLoad && (
            <div className="text-center py-10">
              <p className="text-xl text-gray-500">
                No products found matching your criteria.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductCatalog;
