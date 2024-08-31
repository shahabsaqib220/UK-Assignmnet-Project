import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { IoBagCheckOutline } from "react-icons/io5";
import AdminNavbar from "./AdminNavbar";
import { IoMdSearch } from "react-icons/io";
import AdministratorNavbar from "./AdministratorNavbar";
import Topbar from "./TopBar";

const CompletedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    const fetchCompletedOrders = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/adminorder/complete`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        const completedOrders = data.filter(
          (order) => order.status === "completed"
        );
        setOrders(completedOrders);
        setFilteredOrders(completedOrders); // Initialize filtered orders
      } catch (error) {
        console.error("Error fetching completed orders:", error);
      }
    };

    fetchCompletedOrders();
  }, []);

  const handleDownload = (orderId) => {
    window.open(`http://localhost:5000/api/uploads/download/${orderId}`);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = orders.filter((order) =>
      order.orderId.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  const handleDeleteOrder = (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/api/completedorders/delete/${orderId}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            setOrders(orders.filter((order) => order._id !== orderId));
            setFilteredOrders(
              filteredOrders.filter((order) => order._id !== orderId)
            );
            Swal.fire("Deleted!", "The order has been deleted.", "success");
          })
          .catch((error) => {
            Swal.fire(
              "Error!",
              "There was an error deleting the order.",
              "error"
            );
          });
      }
    });
  };

  const handleDeleteAllOrders = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete all completed orders!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:5000/api/completedorders/delete-completed", {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            setOrders([]);
            setFilteredOrders([]);
            Swal.fire(
              "Deleted!",
              "All completed orders have been deleted.",
              "success"
            );
          })
          .catch((error) => {
            Swal.fire(
              "Error!",
              "There was an error deleting the orders.",
              "error"
            );
          });
      }
    });
  };

  return (
    <>
      <Topbar />
      {/* Render the AdminNavbar */}
      <AdministratorNavbar />
     
      <div className="container mx-auto mt-10">
                <h2 className="text-2xl font-semibold mb-5">Completed Orders</h2>
          {/* Display the Delete All button if there are completed orders */}
          {filteredOrders.length > 0 && (
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-lg font-semibold font-moseo"
              onClick={handleDeleteAllOrders}
            >
              Delete All
            </button>
          )}
        </div>

        {/* Check if there are no orders */}
        {filteredOrders.length === 0 ? (
          // Display a message when there are no orders
          <p className="text-center text-gray-500 mt-4 font-moseo">
            No orders to be completed.
          </p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg mt-3">
          <thead className="bg-yellow-100 text-black">
            <tr>
              <th className="py-3 px-6 text-left font-semibold border-b border-gray-200">Name</th>
              <th className="py-3 px-6 text-left font-semibold border-b border-gray-200">Email</th>
              <th className="py-3 px-6 text-left font-semibold border-b border-gray-200">Academic Level</th>
              <th className="py-3 px-6 text-left font-semibold border-b border-gray-200">Words Count</th>
              <th className="py-3 px-6 text-left font-semibold border-b border-gray-200">Paper Type</th>
              <th className="py-3 px-6 text-left font-semibold border-b border-gray-200">Order ID</th>
              <th className="py-3 px-6 text-left font-semibold border-b border-gray-200">Status</th>
              <th className="py-3 px-6 text-left font-semibold border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-100 transition-colors duration-200">
                <td className="py-3 px-6 border-b border-gray-200 font-medium text-gray-900">{order.name}</td>
                <td className="py-3 px-6 border-b border-gray-200 text-gray-800">{order.email}</td>
                <td className="py-3 px-6 border-b border-gray-200 text-gray-800">{order.academicLevel}</td>
                <td className="py-3 px-6 border-b border-gray-200 text-gray-800">{order.wordCount}</td>
                <td className="py-3 px-6 border-b border-gray-200 text-gray-800">{order.paperType}</td>
                <td className="py-3 px-6 border-b border-gray-200 text-gray-800">{order.orderId}</td>
                <td className="py-3 px-6 border-b border-gray-200">
                  <span className="inline-block py-1 px-3 rounded-full text-xs bg-green-200 text-green-800 font-semibold">
                    Completed
                  </span>
                </td>
                <td className="py-3 px-6 border-b border-gray-200">
                  <button
                    className="bg-red-600 text-white py-2 px-4 rounded-lg shadow hover:bg-red-700 transition-colors duration-200"
                    onClick={() => handleDeleteOrder(order._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        

        
        )}
     
    </>
  );
};

export default CompletedOrders;
