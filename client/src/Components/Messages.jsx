// src/components/Messages.jsx

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import AdministratorNavbar from "./AdministratorNavbar";
import Topbar from "./TopBar";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  // Fetch messages from the API
  const fetchMessages = async () => {
    try {
      const response = await fetch("https://uk-assignmnet-project.vercel.app/api/contact/all");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Handle deleting all messages
  const handleDeleteAll = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This will delete all messages!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete all!",
      });

      if (result.isConfirmed) {
        try {
          await fetch("https://uk-assignmnet-project.vercel.app/api/contact/deleteall", {
            method: "DELETE",
          });
          setMessages([]);
          Swal.fire("Deleted!", "All messages have been deleted.", "success");
        } catch (error) {
          console.error("Error deleting all messages:", error);
        }
      }
    } catch (error) {
      console.error("Error deleting all messages:", error);
      Swal.fire("Error!", "Failed to delete all messages.", "error");
    }
  };

  // Handle deleting a specific message
  const handleDeleteMessage = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://uk-assignmnet-project.vercel.app/api/contact/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete message");
        }

        setMessages(messages.filter((message) => message._id !== id));
        Swal.fire("Deleted!", "The message has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting message:", error);
        Swal.fire(
          "Error!",
          "There was an error deleting the message.",
          "error"
        );
      }
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <>
      <Topbar />
      <AdministratorNavbar />
      <div className="p-6">
  {messages.length === 0 ? (
    <p className="text-center text-gray-500">No messages right now</p>
  ) : (
    <>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleDeleteAll}
          className="bg-red-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-700 transition-colors duration-300 ease-in-out uppercase tracking-wide"
        >
          Delete All
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            className="bg-white p-6 rounded-lg shadow-xl transform transition-transform hover:scale-105"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4">
              <span className="font-bold text-gray-800">Name:</span>{" "}
              <span className="text-gray-600">{message.name}</span>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-800">Email:</span>{" "}
              <span className="text-gray-600">{message.email}</span>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-800">Phone:</span>{" "}
              <span className="text-gray-600">{message.phone}</span>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-800">Message:</span>
              <p className="text-gray-600 whitespace-pre-wrap mt-2">
                {message.message}
              </p>
            </div>
            <button
              onClick={() => handleDeleteMessage(message._id)}
              className="bg-red-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-700 transition-colors duration-300 ease-in-out uppercase tracking-wide mt-4"
            >
              Delete
            </button>
          </motion.div>
        ))}
      </div>
    </>
  )}
</div>

    </>
  );
};

export default Messages;
