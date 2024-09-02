import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import TopBar from "./TopBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Swal from "sweetalert2";
import Ribbon from "./Ribbon";
import TawkChat from "./TawkToChat";

const ScrollReveal = ({ children }) => {
  const controls = useAnimation();
  const [elementIsVisible, setElementIsVisible] = useState(false);
  const ref = useRef();

  const handleScroll = () => {
    const { top } = ref.current.getBoundingClientRect();
    if (top <= window.innerHeight * 0.75) {
      setElementIsVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (elementIsVisible) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
      });
    }
  }, [elementIsVisible, controls]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={controls}>
      {children}
    </motion.div>
  );
};

const YourOrders = () => {
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(null);
  const [downloadError, setDownloadError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !orderId) {
      Swal.fire("Error", "Please enter both email and order ID", "error");
      return;
    }
    try {
      const response = await fetch("https://uk-assignmnet-project.vercel.app/api/orders/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, orderId }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      const data = await response.json();
      const firebaseBaseUrl = `https://storage.googleapis.com/assignment-ask3.appspot.com/solutions/${orderId}`;

      setUserData({
        ...data,
        solutionFilePath1: data.solutionFilePath1
          ? `${firebaseBaseUrl}/${data.solutionFilePath1.split("/").pop()}`
          : null,
        solutionFilePath2: data.solutionFilePath2
          ? `${firebaseBaseUrl}/${data.solutionFilePath2.split("/").pop()}`
          : null,
      });
      setError(null);
    } catch (error) {
      setUserData(null);
      Swal.fire(
        "Error",
        "Invalid Email or Order ID! Record not found",
        "error"
      );
    }
  };
  const handleDownloadClick = (filePath, fileType) => {
    if (filePath) {
      setDownloading(fileType);
      const url = filePath;
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.click();
      setDownloading(null);
    } else {
      setDownloadError("No solution file available for download");
      setTimeout(() => setDownloadError(null), 3000);
    }
  };
  
  
  

  return (
    <>
      <Ribbon />
      <TawkChat />
      <TopBar />
      <Navbar />
      <form onSubmit={handleSubmit} className="py-16">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div
            className="hidden lg:block lg:w-1/2 bg-cover"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80")',
            }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">
              Your Orders
            </h2>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-100 border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Order ID
              </label>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="bg-gray-100 border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-gray-700 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                required
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Search Orders
              </button>
            </div>
          </div>
        </div>
      </form>
      {userData && (
        <div className="mt-8 mx-auto max-w-4xl">
          <h3 className="font-moseo text-2xl font-semibold text-gray-700 text-center">
            Order Details
          </h3>
          <div className="overflow-x-auto mt-4">
            <table className="w-full table-auto border-collapse border rounded-md">
              <thead>
                <tr className="bg-gray-600 text-white ">
                  <th className="border border-gray-300 font-moseo px-4 py-2">
                    Name
                  </th>
                  <th className="border border-gray-300 font-moseo px-4 py-2">
                    Email
                  </th>
                  <th className="border border-gray-300 font-moseo px-4 py-2">
                    Order ID
                  </th>
                  <th className="border border-gray-300 font-moseo px-4 py-2">
                    Academic Level
                  </th>
                  <th className="border border-gray-300 font-moseo px-4 py-2">
                    Word Count
                  </th>
                  <th className="border border-gray-300 font-moseo px-4 py-2">
                    Paper Type
                  </th>
                  <th className="border border-gray-300 font-moseo px-4 py-2">
                    Deadline
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-red-100 font-semibold">
                  <td className="border border-gray-300 px-4 py-2">
                    {userData.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {userData.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {userData.orderId}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {userData.academicLevel}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {userData.wordCount}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {userData.paperType}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(userData.deadline).toLocaleDateString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 ">
            <h4 className="font-moseo text-lg font-semibold text-gray-700 text-center">
              Solution Files
            </h4>
            {!userData.solutionFilePath1 && !userData.solutionFilePath2 ? (
              <div className="bg-red-200 px-6 py-4 mx-2 my-4 rounded-md text-lg flex items-center  max-w-lg">
                <svg
                  viewBox="0 0 24 24"
                  className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
                >
                  <path
                    fill="currentColor"
                    d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
                  ></path>
                </svg>
                <span className="text-red-800">
                  {" "}
                  No Solutions Files Uploaded Yet!.{" "}
                </span>
              </div>
            ) : (
              <div className="flex gap-4 items-center justify-center">
                {userData.solutionFilePath1 && (
                  <button
                    onClick={() =>
                      handleDownloadClick(userData.solutionFilePath1, "file1")
                    }
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2 w-48 sm:w-64 md:w-80 lg:w-96 xl:w-1/4 ${
                      downloading === "file1"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={downloading === "file1"}
                  >
                    {downloading === "file1" ? (
                      <span className="animate-pulse">Downloading...</span>
                    ) : (
                      "Download"
                    )}
                  </button>
                )}
                {userData.solutionFilePath2 && (
                  <button
                    onClick={() =>
                      handleDownloadClick(userData.solutionFilePath2, "file2")
                    }
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2 w-48 sm:w-64 md:w-80 lg:w-96 xl:w-1/4 ${
                      downloading === "file2"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={downloading === "file2"}
                  >
                    {downloading === "file2" ? (
                      <span className="animate-pulse">Downloading...</span>
                    ) : (
                      "Download"
                    )}
                  </button>
                )}
              </div>
            )}
            {downloadError && (
              <p className="text-center font-semibold text-red-500 mt-2">
                {downloadError}
              </p>
            )}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default YourOrders;
