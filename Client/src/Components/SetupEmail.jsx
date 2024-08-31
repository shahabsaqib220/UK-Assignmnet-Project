import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiEdit } from "react-icons/fi";
import { MdAttachEmail, MdMarkEmailRead } from "react-icons/md";
import Topbar from "./TopBar";
import AdministratorNavbar from "./AdministratorNavbar";
import Swal from "sweetalert2";

const EmailSetupForm = () => {
  const [text, setText] = useState("");
  const [subject, setSubject] = useState("");
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedText, setUpdatedText] = useState("");
  const [updatedSubject, setUpdatedSubject] = useState("");
  const [updatedFileName, setUpdatedFileName] = useState("");

  const fetchEmailSetup = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/setupemail/getemailsetup/mail-setup"
      );
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setText(data.text);
      setSubject(data.subject || "");
      setFileName(data.filePath.split("\\").pop());
      setUpdatedText(data.text);
      setUpdatedSubject(data.subject || "");
      setUpdatedFileName(data.filePath.split("\\").pop());
    } catch (error) {
      console.error("Error fetching email setup:", error);
    }
  };

  useEffect(() => {
    fetchEmailSetup();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("text", text);
    formData.append("subject", subject);

    if (file) {
      formData.append("file", file);
    } else {
      console.error("File is not defined.");
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/setupemail/update-email-setup",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const result = await response.json();
      setIsEditing(false);
      setUpdatedText(text);
      setUpdatedSubject(subject);
      setUpdatedFileName(file ? file.name : fileName);

      Swal.fire({
        title: "Success!",
        text: "Email setup updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          title: "text-lg font-semibold",
          text: "text-base",
        },
      });
    } catch (error) {
      console.error("Error updating email setup:", error);

      Swal.fire({
        title: "Error!",
        text: "Failed to update email setup.",
        icon: "error",
        confirmButtonText: "Try Again",
        customClass: {
          title: "text-lg font-semibold",
          text: "text-base",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (event) => {
    event.preventDefault();
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFile(null);
    setText(updatedText);
    setSubject(updatedSubject);
    setFileName(updatedFileName);
  };

  return (
    <>
      <Topbar />
      <AdministratorNavbar />

      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-200 via-white to-purple-200 p-6">
  <motion.div
    className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl flex flex-col md:flex-row transform hover:scale-105 transition-transform duration-300"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="w-full md:w-1/2 p-6"
    >
      <h2 className="text-3xl font-extrabold mb-6 text-center flex items-center justify-center text-gray-900">
        <MdAttachEmail className="mr-2 text-blue-600" />
        Advertising Email
      </h2>
      <div className="mb-6">
        <label
          htmlFor="subject"
          className="block text-gray-700 text-lg flex items-center"
        >
          <MdMarkEmailRead className="mr-2 text-blue-500" /> Email Subject
        </label>
        <textarea
          id="subject"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={`mt-2 block w-full p-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
            !isEditing ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isEditing}
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="text"
          className="block text-gray-700 text-lg flex items-center"
        >
          <MdMarkEmailRead className="mr-2 text-blue-500" /> Email Text
        </label>
        <textarea
          id="text"
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={`mt-2 block w-full p-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
            !isEditing ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isEditing}
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="file"
          className="block text-gray-700 text-lg flex items-center"
        >
          <FiEdit className="mr-2 text-blue-500" /> Upload File
        </label>
        <input
          id="file"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className={`mt-2 block w-full text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
            !isEditing ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!isEditing}
        />
      </div>
      <div className="flex gap-4">
        {!isEditing ? (
          <button
            type="button"
            onClick={handleEditClick}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-3 rounded-lg text-lg w-full flex items-center justify-center transform hover:scale-105 transition-transform duration-200"
          >
            <FiEdit className="mr-2" /> Edit
          </button>
        ) : (
          <>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-3 rounded-lg w-full transform hover:scale-105 transition-transform duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
            <button
              type="button"
              onClick={handleCancelClick}
              className="bg-gradient-to-r from-gray-500 to-gray-700 text-white p-3 rounded-lg w-full transform hover:scale-105 transition-transform duration-200"
              disabled={isLoading}
            >
              Cancel
            </button>
          </>
        )}
      </div>
      {isLoading && (
        <div className="mt-4 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
        </div>
      )}
    </form>
    <motion.div
      className="w-full md:w-1/2 flex flex-col items-center justify-center mt-6 md:mt-0"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img
        src="https://assets.lummi.ai/assets/QmThL7oCf99zA7ajDRwhH7FgrcCCTtmQcQPuMqNBwGKyHy?auto=format&w=1500"
        alt="Placeholder"
        className="rounded-2xl shadow-2xl mb-4 transform hover:scale-105 transition-transform duration-300"
      />
    </motion.div>
  </motion.div>
</div>

    </>
  );
};

export default EmailSetupForm;
