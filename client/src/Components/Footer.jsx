import React from "react";
import "../footer.css"; // Import the CSS file
import visa from "../assets/images/visa.png";
import mastercard from "../assets/images/mastercard.png";
import americanexpress from "../assets/images/americanexpress.png";
import maestro from "../assets/images/maestro.png";

const Footer = () => {
  return (
    <>
      <footer className="footer-background text-gray-300 w-full mx-auto p-4 md:p-8 footer-font">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-white lg:mx-32 mt-6 md:mt-14 flex justify-center md:justify-start text-xl md:text-2xl font-semibold">
              Contact
            </h2>
            <address className="not-italic text-center md:text-left mt-4 md:mt-6 font-moseo text-white w-full md:w-auto">
              <p className="mt-6 lg:mx-28">
                <span className="text-teal-400">Tel:</span>+44 7851 410518
              </p>
              <p className="text-teal-400 lg:mx-12">
                Email: <a className="text-white">assignmentask3@gmail.com</a>
              </p>
            </address>
            <div className="mt-4 flex flex-col md:flex-row justify-center lg:mx-20 md:justify-start items-center md:items-start">
              <p className="mx-2 text-xl flex flex-wrap items-center justify-center md:justify-start">
                Assignmentask 3
                <div className="md:flex">
                  <img
                    src={visa}
                    alt="Visa"
                    className="inline-block mx-1 mb-1 h-14 md:mt-0"
                  />
                  <img
                    src={mastercard}
                    alt="Mastercard"
                    className="inline-block mx-1 h-14  md:mt-0"
                  />
                  <img
                    src={americanexpress}
                    alt="American Express"
                    className="inline-block -mx-2 h-14  md:mt-0"
                  />
                </div>
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-white mt-6 md:mt-14 flex justify-center text-xl md:text-2xl font-semibold">
              Services
            </h2>
            <ul className="flex flex-col items-center md:items-center">
              {[
                "Essay Writing",
                "College Assignment",
                "University Assignment Help",
                "Editing and Proofreading",
                "Report Writing",
                "Dissertation Writing",
              ].map((service) => (
                <li
                  key={service}
                  className="uppercase font-moseo text-white mt-6"
                >
                  <div className="flex flex-col items-center md:items-center">
                    <a>{service}</a>
                    <span className="blue-line mt-2"></span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-white mt-6 md:mt-14 flex justify-center text-xl md:text-2xl font-semibold">
              Expertise
            </h2>
            <ul className="flex flex-col items-center md:items-center">
              {[
                "Modern Tools",
                "Original in Projects",
                "Expert Tutors",
                "Timely Delivery",
                "Our Vision",
                "Our History",
              ].map((tech) => (
                <li key={tech} className="uppercase font-moseo text-white mt-6">
                  <div className="flex flex-col items-center md:items-center">
                    <a>{tech}</a>
                    <span className="blue-line mt-2"></span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
      <footer className="bg-white py-1">
        <div className="container mx-auto text-center">
          <p className="text-gray-600 font-moseo mt-2 text-sm">
            &copy; 2024 Assignmentask 3 Email: assignmentask3@gmail.com
          </p>
          <p className="text-gray-600 font-moseo text-sm">
            Phone No: +44 7851 410518
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
