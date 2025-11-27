import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDot } from "react-loading-indicators";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { FaStar, FaBoxOpen } from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/products/${id}?select=title,brand,description,price,rating,stock,images,discountPercentage`
        );

        const productData = response.data;
        setSelectedProduct(productData);

        if (productData.images && productData.images.length > 0) {
          setMainImage(productData.images[0]);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message || "Failed to fetch product details.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleQuantityChange = (action) => {
    const maxStock = selectedProduct?.stock || 1;

    if (action === "plus" && quantity < maxStock) {
      setQuantity((prev) => prev + 1);
    }
    if (action === "minus" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(addToCart({ product: selectedProduct, quantity: quantity }));
      setQuantity(1);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center min-h-screen">
        <p className="text-xl font-semibold text-gray-500">
          Loading product details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center text-red-600 min-h-screen">
        <p className="text-xl font-semibold">Error: {error}</p>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="text-center py-10 text-xl font-medium min-h-screen">
        Product not found.
      </div>
    );
  }

  const {
    title,
    brand,
    description,
    price,
    rating,
    stock,
    images,
    discountPercentage,
  } = selectedProduct;

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10">
      <div className="bg-white shadow-2xl rounded-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-6 bg-gray-50 flex flex-col">
            <div className="flex-grow flex items-center justify-center mb-4">
              {mainImage && (
                <img
                  src={mainImage}
                  alt={title}
                  className="w-full max-h-[500px] object-contain rounded-lg shadow-md"
                />
              )}
            </div>

            {images && images.length > 1 && (
              <div className="flex overflow-x-auto space-x-3 p-1 justify-center">
                {images.map((imgUrl, index) => (
                  <img
                    key={index}
                    src={imgUrl}
                    alt={`${title} thumbnail ${index + 1}`}
                    onClick={() => setMainImage(imgUrl)}
                    className={`w-16 h-16 object-cover rounded-md cursor-pointer transition duration-150 ${
                      mainImage === imgUrl
                        ? "border-2 border-black shadow-lg"
                        : "border border-gray-300 hover:border-gray-500"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="md:w-1/2 p-8 md:p-10">
            <p className="text-sm font-semibold text-black uppercase mb-2">
              {brand}
            </p>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              {title}
            </h1>

            <div className="flex items-baseline mb-6 border-b pb-4">
              {discountPercentage > 0 && (
                <p className="text-xl text-gray-500 line-through mr-3">
                  ${(price / (1 - discountPercentage / 100)).toFixed(2)}
                </p>
              )}
              <p className="text-4xl font-bold text-red-600">
                ${price.toFixed(2)}
              </p>

              {discountPercentage > 0 && (
                <span className="ml-3 text-lg font-semibold text-white bg-red-600 px-3 py-1 rounded-full">
                  {discountPercentage}% OFF
                </span>
              )}
            </div>

            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              About this item
            </h2>
            <p className="text-gray-700 mb-8 leading-relaxed">{description}</p>

            <div className="space-y-4 mb-3">
              <div className="flex items-center text-lg">
                <FaStar className="text-yellow-500 mr-2" />
                <p>
                  Rating:{" "}
                  <span className="font-bold text-gray-900">{rating} / 5</span>
                </p>
              </div>
              <div className="flex items-center text-lg">
                <FaBoxOpen className="text-green-600 mr-2" />
                <p>
                  In Stock:
                  <span className={`font-bold ml-1 text-gray-800`}>
                    {stock > 0 ? `${stock} units` : "Out of Stock"}
                  </span>
                </p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-lg font-semibold text-gray-800 mb-2">
                Quantity:
              </p>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleQuantityChange("minus")}
                  disabled={quantity <= 1}
                  className="px-4 py-2 bg-gray-100 rounded-lg text-xl font-medium hover:bg-gray-200 transition disabled:opacity-50"
                >
                  -
                </button>
                <span className="text-xl font-bold w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange("plus")}
                  disabled={quantity >= stock}
                  className="px-4 py-2 bg-gray-100 rounded-lg text-xl font-medium hover:bg-gray-200 transition disabled:opacity-50"
                >
                  +
                </button>
              </div>
              {stock > 0 && quantity === stock && (
                <p className="text-sm text-red-500 mt-2">
                  Maximum stock reached.
                </p>
              )}
            </div>

            <button
              className=" w-full py-3 bg-black text-white text-xl font-bold rounded-lg shadow-lg hover:bg-gray-800 transition duration-200 disabled:opacity-50 cursor-pointer"
              onClick={handleAddToCart}
              disabled={stock === 0}
            >
              {stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
