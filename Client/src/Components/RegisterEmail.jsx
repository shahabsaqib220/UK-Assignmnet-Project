import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import Swal from "sweetalert2";
import "tailwindcss/tailwind.css";
import Topbar from "./TopBar";
import AdministratorNavbar from "./AdministratorNavbar";

const EmailRegisterForm = () => {
  const [email, setEmail] = useState("");
  const [registeredEmails, setRegisteredEmails] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRemoving, setIsRemoving] = useState(null); // Track the ID of the email being removed
  const [isRemovingAll, setIsRemovingAll] = useState(false);

  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 500 },
  });

  useEffect(() => {
    fetchRegisteredEmails();
  }, []);

  useEffect(() => {
    const filtered = registeredEmails.filter((email) =>
      email.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmails(filtered);
  }, [searchTerm, registeredEmails]);

  const fetchRegisteredEmails = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/emails/get-all-emails");
      const data = await response.json();
      setRegisteredEmails(data);
      setFilteredEmails(data);
    } catch (error) {
      console.error("Error fetching emails", error);
      Swal.fire("Error", "Could not fetch emails", "error");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsRegistering(true);
    try {
      const response = await fetch("http://localhost:5000/api/emails/registeremail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setEmail("");
        fetchRegisteredEmails();
        Swal.fire("Success", "Email registered successfully", "success");
      } else {
        const errorData = await response.json();
        if (errorData.error === "Email already exists") {
          Swal.fire("Error", "This email is already registered", "error");
        } else {
          console.error("Error registering email", errorData.message);
          Swal.fire("Error", errorData.message, "error");
        }
      }
    } catch (error) {
      console.error("Error registering email", error);
      Swal.fire("Error", "Could not register email", "error");
    } finally {
      setIsRegistering(false);
    }
  };

  const handleRemove = async (id, email) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to remove ${email}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "No, keep it",
    });

    if (result.isConfirmed) {
      setIsRemoving(id); // Track the ID of the email being removed
      try {
        const response = await fetch(`http://localhost:5000/api/emails/delete-email/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchRegisteredEmails();
          Swal.fire("Removed!", `${email} has been removed.`, "success");
        } else {
          const errorData = await response.json();
          console.error("Error removing email", errorData.message);
          Swal.fire("Error", errorData.message, "error");
        }
      } catch (error) {
        console.error("Error removing email", error);
        Swal.fire("Error", "Could not remove email", "error");
      } finally {
        setIsRemoving(null);
      }
    }
  };

  const handleRemoveAll = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to remove all emails?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove all!",
      cancelButtonText: "No, keep them",
    });

    if (result.isConfirmed) {
      setIsRemovingAll(true);
      try {
        const response = await fetch("http://localhost:5000/api/emails/delete-all-emails", {
          method: "DELETE",
        });

        if (response.ok) {
          fetchRegisteredEmails();
          Swal.fire("Removed!", "All emails have been removed.", "success");
        } else {
          const errorData = await response.json();
          console.error("Error removing all emails", errorData.message);
          Swal.fire("Error", errorData.message, "error");
        }
      } catch (error) {
        console.error("Error removing all emails", error);
        Swal.fire("Error", "Could not remove all emails", "error");
      } finally {
        setIsRemovingAll(false);
      }
    }
  };

  return (
    <>
      <Topbar />
      <AdministratorNavbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
  <div className="flex flex-col-reverse md:flex-row items-center w-full max-w-4xl bg-white shadow-2xl rounded-lg overflow-hidden transform transition-transform hover:scale-105">
    <div className="w-full md:w-1/2">
      <img
        src="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?q=80&w=2517&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpg"
        alt="Description"
        className="object-cover w-full h-64 md:h-full"
      />
    </div>
    <div className="w-full md:w-1/2 p-8 bg-gradient-to-r from-blue-50 to-blue-100">
      <animated.div style={fadeIn}>
        <form
          className="flex flex-col items-center space-y-6"
          onSubmit={handleRegister}
        >
          <h2 className="text-3xl font-extrabold text-gray-800 font-moseoSans uppercase tracking-wide">
            Register Student Emails
          </h2>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-sm transition-all duration-300 ease-in-out"
            disabled={isRegistering || isRemovingAll}
          />
          <button
            className="px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300 ease-in-out uppercase tracking-wide"
            type="submit"
            disabled={isRegistering || isRemovingAll}
          >
            {isRegistering ? (
              <div className="animate-pulse">Registering...</div>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </animated.div>
    </div>
  </div>
  <div className="mt-8 w-full max-w-4xl bg-white shadow-2xl rounded-lg p-6">
    <h2 className="text-xl font-moseoSans uppercase font-bold text-gray-800 mb-4">
      Registered Emails
    </h2>
    <input
      type="text"
      placeholder="Search Emails"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full px-4 py-2 mb-4 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-sm transition-all duration-300 ease-in-out"
      disabled={isRegistering || isRemovingAll}
    />
    <div className="flex flex-col space-y-2">
      {filteredEmails.length === 0 ? (
        <p className="text-gray-500">No email found.</p>
      ) : (
        filteredEmails.map((email) => (
          <div
            key={email._id}
            className="flex justify-between items-center bg-blue-50 p-2 rounded-md shadow-sm hover:bg-blue-100 transition-colors duration-300 ease-in-out"
          >
            <span className="text-gray-700">{email.email}</span>
            <button
              onClick={() => handleRemove(email._id, email.email)}
              className="px-4 py-2 text-white bg-red-500 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all duration-300 ease-in-out"
              disabled={
                isRegistering || isRemovingAll || isRemoving === email._id
              }
            >
              {isRemoving === email._id ? (
                <div className="animate-pulse">Removing...</div>
              ) : (
                "Remove"
              )}
            </button>
          </div>
        ))
      )}
    </div>
    {registeredEmails.length > 0 && (
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleRemoveAll}
          className="px-6 py-3 text-lg font-semibold text-white bg-red-600 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all duration-300 ease-in-out uppercase tracking-wide"
          disabled={isRegistering || isRemovingAll}
        >
          {isRemovingAll ? (
            <div className="animate-pulse">Removing All...</div>
          ) : (
            "Remove All"
          )}
        </button>
      </div>
    )}
  </div>
</div>

    </>
  );
};

export default EmailRegisterForm;
