import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm text-gray-400">
          &copy; {currentYear} MyBrand. All rights reserved.
        </p>

        <div className="mt-2 space-x-4 text-sm">
          <a
            href="#privacy"
            className="text-gray-400 hover:text-white transition duration-150"
          >
            Privacy Policy
          </a>
          <span className="text-gray-500">|</span>
          <a
            href="#terms"
            className="text-gray-400 hover:text-white transition duration-150"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
