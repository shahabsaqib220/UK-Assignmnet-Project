import React from "react";
import logo from "../assets/images/logo.jpeg";
import emailIcon from "../assets/images/email.png";
import whatappIcon from "../assets/images/whatapp-icons.png";

const Topbar = () => {
  return (
    <div className="w-full lg:h-60 sm:h-44 bg-gray-100 border-b border-gray-200 flex items-center py-2">
      {/* Left Side: Images */}
      <div className="flex-1"></div>

      {/* Center: Logo */}
      <div className="flex justify-center">
        <img src={logo} alt="Logo" className="lg:h-40 h-12" />
      </div>

      {/* Right Side: Email and Phone Number */}
      <div className="flex justify-center flex-1 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center space-y-0.5">
          <div className="mb-2 md:mb-4">
            <a
              href="https://wa.me/447851410518"
              className="flex items-center text-[#3b3b3b] hover:text-[#1a1a1a] transition-colors"
            >
              <img
                src={whatappIcon}
                alt="WhatsApp Icon"
                className="w-6 sm:w-6 md:w-10 lg:w-4 xl:w-12 mr-2"
              />
              <span className="hidden md:inline font-semibold">
                +44 7851 410518
              </span>
            </a>
          </div>
          <div>
            <a
              href="mailto:assignmentask3@gmail.com"
              className="flex items-center text-[#3b3b3b] hover:text-[#1a1a1a] transition-colors"
            >
              <img
                src={emailIcon}
                alt="Email Icon"
                className="w-6 sm:w-6 md:w-10 lg:w-4 xl:w-12 mr-2"
              />
              <span className="hidden md:inline font-semibold">
                assignmentask3@gmail.com
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
