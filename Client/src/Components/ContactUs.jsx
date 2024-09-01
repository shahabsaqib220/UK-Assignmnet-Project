import React, { useState } from "react";
import InputMask from "react-input-mask";
import Swal from "sweetalert2";
import { useSpring, animated } from "react-spring";
import Navbar from "./Navbar";
import Footer from "./Footer";
import TopBar from "./TopBar";
import Ribbon from "./Ribbon";
import TawkChat from "./TawkToChat";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const maxChars = 400; // Set your maximum character limit

  const countCharacters = (text) => {
    return text.replace(/\s+/g, "").length; // Remove all spaces and count characters
  };

  const handleChange = (e) => {
    const input = e.target.value;
    if (countCharacters(input) <= maxChars) {
      setMessage(input);
    }
  };

  const remainingChars = maxChars - countCharacters(message);

  const formAnimation = useSpring({
    opacity: 1,
    transform: "translateX(0)",
    from: { opacity: 0, transform: "translateX(-50%)" },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Name is required!",
      });
      return;
    }

    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email is required!",
      });
      return;
    }

    if (!phone) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Phone number is required!",
      });
      return;
    }

    if (!message) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Message is required!",
      });
      return;
    }

    try {
      const response = await fetch("https://uk-assignmnet-project.vercel.app/api/contact/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
        }),
      });

      if (response.ok) {
        Swal.fire({
          title: "Success",
          text: "Your message has been sent to the admin! Feel free to ask for help!",
          icon: "success",
        });
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to send message",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while sending the message",
      });
    }
  };

  return (
    <>
      <Ribbon />
      <TawkChat />
      <TopBar />
      <Navbar />
      <div className="w-full p-9 bg-gray-400">
        <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-center w-full space-y-4 md:space-y-0">
            <div className="md:w-1/3 p-4 flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1560438718-eb61ede255eb?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Contact Us"
                className="rounded-lg shadow-lg"
              />
            </div>
            <animated.div style={formAnimation} className="md:w-1/3 p-4">
              <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                  Let's Connect
                </h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-gray-700">
                      WhatsApp Number
                    </label>
                    <InputMask
                      mask="(999) 999-99999"
                      maskChar=" "
                      id="phone"
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="Your WhatsApp Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-700">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="Your Message"
                      value={message}
                      onChange={handleChange}
                      required
                      maxLength={maxChars} // This attribute limits the number of characters in the textarea
                    ></textarea>
                    <p className="mt-2 text-gray-600">
                      {remainingChars} characters remaining
                    </p>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </animated.div>
            <div className="md:w-1/3 p-4 flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1544116677-f46470b8d04b?q=80&w=2565&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Instructions"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center w-full space-y-4 md:space-y-0">
            <div className="md:w-1/3 p-4 flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Instructions"
                className="rounded-lg shadow-lg"
              />
            </div>
            <animated.div style={formAnimation} className="md:w-1/3 p-4">
              <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Instructions about Message
                </h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Introduce yourself and provide your full name.</li>
                  <li>Clearly state the purpose of your inquiry or message.</li>
                  <li>
                    If applicable, mention any relevant order IDs or details.
                  </li>
                  <li>
                    Be concise and to the point while providing all necessary
                    information.
                  </li>
                  <li>Ensure your contact information is accurate.</li>
                  <li>
                    For urgent matters, consider following up with a phone call.
                  </li>
                </ul>
              </div>
            </animated.div>
            <div className="md:w-1/3  flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Contact Us"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
