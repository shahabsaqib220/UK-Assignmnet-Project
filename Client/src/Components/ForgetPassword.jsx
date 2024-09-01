import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
    repeatPassword: "",
  });
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://uk-assignmnet-project.vercel.app/api/admin/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData.email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Email not found",
        });
        setError("Email not found");
      } else {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "OTP sent to your email",
        });
        setMessage("OTP sent to your email");
        setStep(2);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred",
      });
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (formData.password !== formData.repeatPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Password and repeat password must be the same",
      });
      return;
    }

    if (formData.password.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Password must be at least 8 characters long",
      });
      return;
    }

    try {
      const response = await fetch(
        "https://uk-assignmnet-project.vercel.app/api/admin/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Invalid or expired OTP",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Password reset successfully",
        });
        setMessage("Password reset successfully");
        navigate("/login");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred",
      });
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 lg:space-x-20 lg:space-y-24 gap-8">
          <div className="hidden lg:block">
            <img
              src="https://img.freepik.com/free-vector/global-data-security-personal-data-security-cyber-data-security-online-concept-illustration-internet-security-information-privacy-protection_1150-37336.jpg?w=900&t=st=1719341585~exp=1719342185~hmac=d33c4c1ace0431c97bef7cdea8c7a367cee91ab4184e31b39be2e68cf5fb4e79"
              alt="Background"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-full space-y-8">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Forget Password
            </h2>
            {error && (
              <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                {error}
              </div>
            )}
            {message && (
              <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
                {message}
              </div>
            )}

            {step === 1 && (
              <form className="mt-8 space-y-6" onSubmit={handleEmailSubmit}>
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={loading}
                  >
                    {loading ? (
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
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM12 24c6.627 0 12-5.373 12-12h-4a8 8 0 01-8 8v4z"
                        ></path>
                      </svg>
                    ) : (
                      "Send Mail"
                    )}
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form className="mt-8 space-y-6" onSubmit={handleResetSubmit}>
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="otp" className="sr-only">
                      OTP
                    </label>
                    <input
                      id="otp"
                      name="otp"
                      type="text"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="OTP"
                      value={formData.otp}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="New Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="repeatPassword" className="sr-only">
                      Repeat Password
                    </label>
                    <input
                      id="repeatPassword"
                      name="repeatPassword"
                      type="password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Repeat New Password"
                      value={formData.repeatPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={loading}
                  >
                    {loading ? (
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
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM12 24c6.627 0 12-5.373 12-12h-4a8 8 0 01-8 8v4z"
                        ></path>
                      </svg>
                    ) : (
                      "Reset Password"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgetPassword;
