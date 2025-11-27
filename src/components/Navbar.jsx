import React, { useState } from "react";
import { Menu, X, ShoppingCart, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart, selectTotalItems } from '../redux/slices/cartSlice'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const dispatch = useDispatch();
  const totalItems = useSelector(selectTotalItems); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: "Products", to: "products" },
  ];

  return (
    <nav className="bg-gray-800 dark:bg-gray-900 p-4 shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link 
            to="/" 
            className="text-white text-2xl font-bold"
          > 
            Nepasys
          </Link>
          

          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>



        <div className="flex items-center space-x-4">
        
          <div 
            className="relative cursor-pointer"
            onClick={() => dispatch(toggleCart())} 
          >
            <ShoppingCart color="white" className="h-6 w-6" /> 
            {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems} 
                </span>
            )}
          </div>

          
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white p-2 rounded-md"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 space-y-2 px-2 pt-2 pb-3 bg-gray-700 rounded-lg dark:bg-gray-800">
          

          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              onClick={toggleMenu}
              className="text-gray-300 hover:bg-gray-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-150"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
