import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "../Ribbon.css"; // Ensure this path points to the CSS file
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import { faSquareWhatsapp } from "@fortawesome/free-brands-svg-icons";
const handleOrderNowClick = (e) => {
  window.scrollTo({
    top: 0.1,
    behavior: "smooth", // Smooth scroll to the top
  });
  // If you need to redirect to the homepage, you can use:
  window.location.href = "https://uk-assignmnet-project-frontend.vercel.app/";
};
const handleWhatappClick = () => {
  // Construct the WhatsApp URL with the phone number
  const phoneNumber = "447851410518";
  const message = "Hello, I am interested in your services."; // Customize the message if needed
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;
  window.location.href = url;
};

const handleMailClick = () => {
  // Construct the mailto URL with the email address
  const email = "assignmenttask3@gmail.com";
  const url = `mailto:${email}`;

  // Redirect to the mailto URL
  window.location.href = url;
};

const Ribbon = () => {
  return (
    <>
      <div className="ribbon-container " onClick={handleOrderNowClick}>
        <div className="icon-container font-semibold">
          <FontAwesomeIcon icon={faShoppingCart} className="icon size-6 mx-2" />
        </div>
      </div>
      <div className="ribbon-container1 mt-16 " onClick={handleMailClick}>
        <div className="icon-container1 font-semibold">
          <FontAwesomeIcon icon={faEnvelope} className="icon size-6 mx-2" />
        </div>
      </div>
      <div className="ribbon-container2 mt-32" onClick={handleWhatappClick}>
        <div className="icon-container2 font-semibold">
          <FontAwesomeIcon
            icon={faSquareWhatsapp}
            className="icon size-7 mx-2"
          />
        </div>
      </div>
    </>
  );
};

export default Ribbon;
