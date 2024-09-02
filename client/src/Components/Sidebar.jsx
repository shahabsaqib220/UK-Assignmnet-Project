import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Swal from "sweetalert2";
import Topbar from "./TopBar";
import AdministratorNavbar from "./AdministratorNavbar";

const Sidebar = () => {
  const [orders, setOrders] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [uploadStatus, setUploadStatus] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState({});
  const [isConfirmed, setIsConfirmed] = useState(false);
  

  const handleFileChange = (event, orderId, fileType) => {
    const file = event.target.files[0];
    setSelectedFiles({
      ...selectedFiles,
      [orderId]: {
        ...selectedFiles[orderId],
        [fileType]: file,
      },
    });
  };




  const handleYesClick = () => {
 
    Swal.fire({
      title: 'Are you sure?',
      text: 'Is this a valid receipt?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        approvePayment(orders.orderId);
        setIsConfirmed(true);
      }
    });
  };
  

  const approvePayment = async (orderId) => {
   
    try {
      await fetch("https://uk-assignmnet-project.vercel.app/api/paymentstatus/approvepayment", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });
    } catch (error) {
      Swal.fire('Error', 'Failed to approve payment.', 'error');
    }
  };
  
  

  const handleNoClick = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Is this not a valid receipt?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        declinePayment(orders.orderId);
        setIsConfirmed(true);
      }
    });
  };

 
  

  const declinePayment = async (orderId) => {
    try {
      await fetch('https://uk-assignmnet-project.vercel.app/api/paymentstatus/declinePayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });
    } catch (error) {
      Swal.fire('Error', 'Failed to decline payment.', 'error');
    }
  };
  


  const handleClearFiles = (orderId) => {
    setSelectedFiles({
      ...selectedFiles,
      [orderId]: { solutionFile1: null, solutionFile2: null },
    });
  };

  const handleUpload = async (orderId) => {
    // Check if selectedFiles[orderId] exists
    if (!selectedFiles[orderId]) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "At least one solution file is required",
      });
      return;
    }

    const { solutionFile1, solutionFile2 } = selectedFiles[orderId];
    if (!solutionFile1 && !solutionFile2) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "At least one solution file is required",
      });
      return;
    }

    const formData = new FormData();
    if (solutionFile1) formData.append("solutionFile1", solutionFile1);
    if (solutionFile2) formData.append("solutionFile2", solutionFile2);

    setLoading({ ...loading, [orderId]: true });

    try {
      const response = await fetch(
        `https://uk-assignmnet-project.vercel.app/api/solutionfile/${orderId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Files uploaded successfully",
      });

      setUploadStatus({ ...uploadStatus, [orderId]: true });

      setOrders((prevOrders) => {
        const updatedOrders = prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, status: "completed" } : order
        );
        return updatedOrders;
      });

      await fetch(`https://uk-assignmnet-project.vercel.app/api/adminorder/${orderId}/complete`, {
        method: "GET",
      });
    } catch (error) {
      console.error("Error uploading files:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to upload files",
      });
    } finally {
      setLoading({ ...loading, [orderId]: false });
    }
  };

const handleDownload = async (orderId, fileType) => {
    try {
        const response = await fetch(`https://uk-assignmnet-project.vercel.app/api/uploads/download/${orderId}/${fileType}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch file URL: ${response.statusText}`);
        }
        const data = await response.json();
        const { fileUrl } = data;

        if (fileUrl) {
            const a = document.createElement('a');
            a.href = fileUrl;
            a.target = '_blank'; // Opens in a new tab
            a.download = fileType; // Set the default filename if needed
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            console.error('No file URL returned');
        }
    } catch (error) {
        console.error('Error downloading file:', error);
    }
};



  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://uk-assignmnet-project.vercel.app/api/adminorder');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error.message);
      }
    };
  
    fetchOrders();
  }, []);;

  const pendingOrders = orders.filter((order) => order.status !== "completed");
const filteredOrders = pendingOrders.filter(
  (order) => order.orderId && order.orderId.toLowerCase().includes(searchTerm.toLowerCase())
);


  return (
    <>
  <Topbar />
  <AdministratorNavbar />

  <div className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
    <h2 className="text-2xl font-semibold mb-5 text-center sm:text-left">
      Pending Orders
    </h2>
    <p className="bg-yellow-100 text-yellow-800 border border-yellow-300 font-semibold rounded-lg p-4 mb-6 text-center sm:text-left">
      <strong className="font-semibold">Note:</strong> Only those students who have their payment approved will display here. (Confirmed Orders).
    </p>

    {filteredOrders.length === 0 ? (
      <p className="text-center text-gray-500 font-moseo">
        No orders received.
      </p>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-yellow-100">
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Academic Level</th>
              <th className="py-2 px-4 border-b">Deadline</th>
              <th className="py-2 px-4 border-b">Word Count</th>
              <th className="py-2 px-4 border-b">Paper Type</th>
              <th className="py-2 px-4 border-b">Order ID</th>
              <th className="py-2 px-4 border-b">Time</th>
              <th className="py-2 px-4 border-b">File 1</th>
              <th className="py-2 px-4 border-b">File 2</th>
              <th className="py-2 px-4 border-b">File 3</th>
              <th className="py-2 px-4 border-b">Solutions Files</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                <td className="py-2 px-4 font-semibold font-moseo">
                  {order.name}
                </td>
                <td className="py-2 px-4 font-semibold font-moseo">
                  {order.email}
                </td>
                <td className="py-2 px-4 font-semibold font-moseo">
                  {order.phone}
                </td>
                <td className="py-2 px-4 font-semibold font-moseo">
                  {order.academicLevel}
                </td>
                <td className="py-2 px-4 font-semibold font-moseo">
                  {new Date(order.deadline).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 font-semibold font-moseo">
                  {order.wordCount}
                </td>
                <td className="py-2 px-4 font-semibold font-moseo">
                  {order.paperType}
                </td>
                <td className="py-2 px-4 font-semibold font-moseo">
                  {order.orderId}
                </td>
                <td className="py-2 px-4 font-semibold font-moseo">
                  {new Date(order.createdAt).toLocaleTimeString()}
                </td>

                <td className="py-2 px-4 font-semibold">
                  {order.problemFilePath ? (
                    <button
                      onClick={() =>
                        handleDownload(order.orderId, "problem")
                      }
                      className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    >
                      Download
                    </button>
                  ) : (
                    <span className="text-red-500 font-moseo">
                      No file uploaded
                    </span>
                  )}
                </td>
                <td className="py-2 px-4 font-semibold">
                  {order.descriptionFilePath ? (
                    <button
                      onClick={() =>
                        handleDownload(order.orderId, "description")
                      }
                      className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    >
                      Download
                    </button>
                  ) : (
                    <span className="text-red-500 font-moseo">
                      No file uploaded
                    </span>
                  )}
                </td>
                <td className="py-2 px-4 font-semibold">
                  {order.requirementFilePath ? (
                    <button
                      onClick={() =>
                        handleDownload(order.orderId, "requirement")
                      }
                      className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    >
                      Download
                    </button>
                  ) : (
                    <span className="text-red-500 font-moseo">
                      No file uploaded
                    </span>
                  )}
                </td>

                <td className="py-2 px-4 font-semibold">
                  {uploadStatus[order.orderId] ? (
                    <span className="text-green-500 font-moseo">
                      Solution file uploaded
                    </span>
                  ) : (
                    <div className="flex flex-col space-y-4 p-4 bg-white shadow-lg rounded-lg">
                     <input
  type="file"
  accept=".pdf, .jpg, .jpeg, .png, .gif, .bmp, .tiff, .ppt, .pptx"
  onChange={(event) =>
    handleFileChange(event, order.orderId, "solutionFile1")
  }
  className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
/>

<input
  type="file"
  accept=".pdf, .jpg, .jpeg, .png, .gif, .bmp, .tiff, .ppt, .pptx"
  onChange={(event) =>
    handleFileChange(event, order.orderId, "solutionFile2")
  }
  className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
/>

                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleUpload(order.orderId)}
                          disabled={loading[order.orderId]}
                          className={`bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 ${
                            loading[order.orderId]
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          {loading[order.orderId] ? (
                            <ImSpinner2 className="animate-spin" />
                          ) : (
                            "Upload"
                          )}
                        </button>
                        <button
                          onClick={() =>
                            handleClearFiles(order.orderId)
                          }
                          className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
</>

  );
};

export default Sidebar;
