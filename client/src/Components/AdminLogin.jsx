import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import Swal from "sweetalert2";
import { useAuth } from "../Context/AuthContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Topbar from "./TopBar";
import loginLogo from "../assets/images/loginLogo.jpeg";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);
      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [error]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    setError(""); // Clear previous errors
    setIsLoading(true); // Start loading
    try {
      const response = await fetch("https://uk-assignmnet-project.vercel.app/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle error response
        setError(data.message || "Invalid credentials");
      } else {
        // Successfully logged in
        login(data.token); // Save token using the login function

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Successfully Logged in",
        });
        navigate("/sidebar");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred during login");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  const textArray = ["Welcome to Admin Panel! Login with your admin Account!"];
  const { y } = useSpring({
    y: 0,
    config: { duration: 5 },
    onRest: () => {
      setIndex((index + 1) % textArray.length);
      setText("");
    },
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setText(textArray[index].slice(0, text.length + 1));
    }, 100);
    return () => clearInterval(intervalId);
  }, [index, text]);

  return (
    <>
    <Topbar/>
      <Navbar />
      <div
  className="flex flex-col min-h-screen bg-cover bg-center"
  style={{
    backgroundImage:
      "url(https://images.unsplash.com/photo-1515847049296-a281d6401047?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)", // Replace with your background image URL
  }}
>
  <div className="w-full flex justify-center items-center mx-auto p-10">
    <animated.div style={{ y }} className="text-4xl font-bold text-black">
      {text}
    </animated.div>
  </div>

  <div className="flex flex-grow justify-center items-center p-10 lg:pr-20 lg:pl-10">
  <form
    className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full space-y-6"
    onSubmit={handleSubmit}
  >
    {/* Logo Section */}
    <div className="flex justify-center">
      <img
        src={loginLogo}
        alt="Logo"
        className="w-48 h-48 object-contain mb-6"
      />
    </div>

    {/* Email Input */}
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Email address
      </label>
      <div className="mt-2">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          id="email"
          autoComplete="email"
          className="block w-full rounded-md border-gray-300 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    {/* Password Input */}
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Password
        </label>
        <div className="text-sm">
          <Link
            to="/forgetpassword"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Forgot password?
          </Link>
        </div>
      </div>
      <div className="mt-2">
        <input
          id="password"
          autoComplete="current-password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="block w-full rounded-md border-gray-300 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    {/* Error Message Placeholder */}
    <div className="min-h-[48px]">
      {error && (
        <div
          className="flex justify-center items-center p-4 mb-4 text-sm text-red-700 bg-red-100 border border-red-400 rounded-lg dark:bg-gray-800 dark:text-red-300"
          role="alert"
        >
          <span className="font-semibold mr-2">Attention:</span> {error}
        </div>
      )}
    </div>

    {/* Submit Button */}
    <div>
      <button
        type="submit"
        className={`flex w-full justify-center rounded-md px-4 py-2 text-sm font-semibold leading-6 text-white shadow-md ${
          isLoading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-500"
        } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
        disabled={isLoading}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        ) : (
          "Login"
        )}
      </button>
    </div>
  </form>
</div>

</div>

      <Footer />
    </>
  );
};

export default AdminLogin;
