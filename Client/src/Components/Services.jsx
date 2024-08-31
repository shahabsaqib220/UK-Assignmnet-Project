// src/components/ServicesSlider.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import service1 from "../assets/images/service1.jpeg";
import service2 from "../assets/images/service2.jpeg";
import service3 from "../assets/images/service3.jpeg";
import service4 from "../assets/images/service4.jpeg";
import service5 from "../assets/images/service5.jpeg";
import service6 from "../assets/images/service6.jpeg";
import { useSpring, animated } from "@react-spring/web";
// Slider settings
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "20px",
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
  ],
};

const AnimatedH1 = () => {
  const [hovered, setHovered] = React.useState(false);

  const props = useSpring({
    transform: hovered ? "scale(1.1)" : "scale(1)",
    color: hovered ? "#FFF" : "#FFF",
  });

  return (
    <animated.h1
      style={props}
      className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      Our Services
    </animated.h1>
  );
};

const ServiceCard = ({ title, description, imgSrc }) => (
  <div
    className="bg-white rounded-2xl shadow-xl p-8 mx-4 my-4 flex flex-col justify-between"
    style={{ height: "450px" }}
  >
    <div className="mb-6 space-y-4 flex-grow">
      <h3 className="text-2xl font-semibold text-black">{title}</h3>
      <p className="mb-4">{description}</p>
    </div>
    <div className="flex justify-center items-center">
      <img
        src={imgSrc}
        className="w-auto h-40 rounded-2xl"
        alt="illustration"
        loading="lazy"
        style={{ width: "auto", height: "150px" }}
      />
    </div>
  </div>
);

const ServicesSlider = () => {
  return (
    <div className="py-16 bg-[#3b3b3b]">
      <div className="container mx-auto px-6 text-gray-500 md:px-12 xl:px-0">
        <AnimatedH1 />
        <Slider {...sliderSettings}>
          <ServiceCard
            title="Eassy Writing"
            description="Our Easy Writing service simplifies the writing process, making it stress-free and efficient. Whether it's an essay, report, or any other document."
            imgSrc={service1}
          />
          <ServiceCard
            title="Dissertation Writing"
            description="Our Dissertation Writing service offers expert assistance in crafting a compelling and well-researched dissertation. We guide you through every stage."
            imgSrc={service2}
          />
          <ServiceCard
            title="Assignment Editing"
            description="Our Assignment Editing service meticulously reviews and refines your work, focusing on clarity, coherence, and accuracy. We enhance your writing's structure and style."
            imgSrc={service3}
          />
          <ServiceCard
            title="University Assignment Help"
            description="Our University Assignment Help provides expert support to tackle challenging coursework and ensure your assignments are well-researched and clearly presented. 






"
            imgSrc={service6}
          />
          <ServiceCard
            title="College Assignment"
            description="Our College Assignment service offers tailored support to help you tackle your coursework with ease. Our experts editing to ensure your assignments are well-organized."
            imgSrc={service4}
          />
          <ServiceCard
            title="Research Report Writing"
            description="
Our Research Report Writing service delivers comprehensive and meticulously crafted reports that reflect thorough research and insightful analysis."
            imgSrc={service5}
          />
        </Slider>
      </div>
    </div>
  );
};

export default ServicesSlider;
