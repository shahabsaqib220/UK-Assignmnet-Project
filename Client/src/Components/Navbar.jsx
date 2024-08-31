import React, { useState } from "react";
import { Link } from "react-router-dom";
import Topbar from "./TopBar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="w-full border-b border-gray-200 shadow-sm">
        <div className="container mx-auto flex md:justify-between lg:justify-center md:px-8 items-center lg:px-0">
          <div className="block lg:hidden">
            <button
              onClick={toggleMenu}
              className="flex items-center px-3 py-2 border rounded text-gray-800 border-gray-800 hover:text-white hover:bg-gray-800"
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <ul
            className={`lg:flex ${
              isOpen ? "block" : "hidden"
            } lg:flex-row lg:space-x-6 lg:space-y-0 space-y-2 lg:items-center text-sm font-medium uppercase w-full justify-center`}
          >
            <li className="hover:bg-gray-800 hover:text-white p-2 transition duration-300 h-full flex items-center">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:bg-gray-800 hover:text-white p-2 transition duration-300 h-full flex items-center">
              <Link to="/about">About</Link>
            </li>
            <li className="hover:bg-gray-800 hover:text-white p-2 transition duration-300 h-full flex items-center">
              <Link to="/get-order">Get Order</Link>
            </li>
            <li className="hover:bg-gray-800 hover:text-white p-2 transition duration-300 h-full flex items-center">
              <Link to="/subjects">Subjects</Link>
            </li>
            <li className="hover:bg-gray-800 hover:text-white p-2 transition duration-300 h-full flex items-center">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
