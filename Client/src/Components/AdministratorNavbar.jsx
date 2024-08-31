import React, { useState } from "react";

import Topbar from "./TopBar";
import { useAuth } from "../Context/AuthContext";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire("Logged Out", "You have been logged out.", "success");
        navigate("/login");
      }
    });
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
              <Link to="/verificationpayment">Pending Payments</Link>
            </li>
            <li className="hover:bg-gray-800 hover:text-white p-2 transition duration-300 h-full flex items-center">
              <Link to="/sidebar">Pending Orders</Link>
            </li>
            <li className="hover:bg-gray-800 hover:text-white p-2 transition duration-300 h-full flex items-center">
              <Link to="/completedorders">Completed Orders</Link>
            </li>
            <li className="hover:bg-gray-800 hover:text-white p-2 transition duration-300 h-full flex items-center">
              <Link to="/setupemail">Setup Email</Link>
            </li>
            <li className="hover:bg-gray-800 hover:text-white p-2 transition duration-300 h-full flex items-center">
              <Link to="/registeremails">Register Email</Link>
            </li>
            <li className="hover:bg-gray-800 hover:text-white p-2 transition duration-300 h-full flex items-center">
              <Link to="/messages">Messages</Link>
            </li>
            <li className="hover:bg-gray-800 hover:text-white p-2 transition duration-300 h-full flex items-center">
              <Link to="/registeradmin">Register Admin</Link>
            </li>
            <li className="hover:bg-gray-800 hover:text-white p-2 transition duration-300 h-full flex items-center">
              <Link onClick={handleLogout}>Logout</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
