import React from "react";
import { X, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsCartOpen,
  addToCart,
  removeFromCart,
  removeAllFromCart,
} from "../redux/slices/cartSlice";

const CartSidebar = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const cartItems = useSelector((state) => state.cart.items);

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <>
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => dispatch(setIsCartOpen(false))}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 w-full md:w-96 h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
                    ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h2 className="text-2xl font-bold flex items-center">
              <ShoppingCart className="mr-2 h-6 w-6 text-green-600" />
              Your Cart
            </h2>

            <button
              onClick={() => dispatch(setIsCartOpen(false))}
              className="text-gray-500 hover:text-gray-800"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500 mt-10">
                Your cart is empty.
              </p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex items-center border-b pb-4">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-sm line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-green-600 font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="p-1 border rounded text-gray-600 hover:bg-gray-100"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="font-medium w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => dispatch(addToCart(item))}
                      className="p-1 border rounded text-gray-600 hover:bg-gray-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => dispatch(removeAllFromCart(item.id))}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="pt-4 border-t mt-4">
              <div className="flex justify-between font-bold text-lg mb-4">
                <span>Total:</span>
                <span>${totalPrice}</span>
              </div>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-200">
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
