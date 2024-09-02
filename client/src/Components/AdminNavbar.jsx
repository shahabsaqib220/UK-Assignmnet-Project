import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import {
  IoReceiptOutline,
  IoCheckboxOutline,
  IoPersonAddOutline,
  IoLogOutOutline,
  IoMenuOutline,
  IoCloseOutline,
} from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import AdministratorNavbar from "./AdministratorNavbar";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { y } = useSpring({
    from: { y: -100 },
    to: { y: 0 },
    config: { duration: 500 },
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return <AdministratorNavbar />;
};

export default Navbar;
