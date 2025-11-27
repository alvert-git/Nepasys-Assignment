import React from "react";
import { Star, ShoppingCart, Heart } from "lucide-react"; 
import { Link } from "react-router-dom";

const ProductGrid = ({ products }) => {
  const calculateOriginalPrice = (price, discountPercentage) => {
    if (!discountPercentage || discountPercentage === 0) return null;
    return (price / (1 - discountPercentage / 100)).toFixed(0);
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:gap-x-6 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((product) => {
        const discountPercentage =
          product.discountPercentage || Math.floor(Math.random() * 30);
        const price = product.price || 50;
        const originalPrice =
          discountPercentage > 0
            ? calculateOriginalPrice(price, discountPercentage)
            : null;

        return (
          <Link key={product.id} to={`/products/${product.id}`}>
            <div className="group h-90 block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-100">
              <div className="relative h-48 sm:h-56 bg-gray-50 overflow-hidden rounded-t-xl">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  src={product.thumbnail}
                  alt={product.title}
                />

                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center space-x-3">
                  <button
                    className="p-3 bg-white/90 text-gray-700 rounded-full shadow-lg hover:bg-white transition duration-200 hover:text-red-500"
                    title="Add to Wishlist"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Heart className="w-5 h-5" />
                  </button>

                  <button
                    className="p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition duration-200"
                    title="Add to Cart"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>

                <div className="absolute top-3 right-3 flex items-center bg-white/90 backdrop-blur-sm rounded-full pl-2 pr-3 py-1 text-sm font-medium shadow-md border border-gray-200">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="text-gray-800">
                    {product.rating.toFixed(1)}
                  </span>
                </div>

                {discountPercentage > 0 && (
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg transform rotate-[-3deg]">
                    -{discountPercentage}%
                  </div>
                )}
              </div>

              <div className="p-4 sm:p-5">
                <h2
                  className="text-lg font-semibold text-gray-900 leading-snug line-clamp-2 mb-2 group-hover:text-indigo-600 transition duration-150"
                  title={product.title}
                >
                  {product.title}
                </h2>

                <div className="flex items-baseline space-x-3 mt-3">
                  <p className="text-2xl font-bold text-indigo-700">
                    Rs. {price}
                  </p>

                  {originalPrice && (
                    <p className="text-base text-red-500 line-through font-medium">
                      Rs. {originalPrice}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductGrid;
