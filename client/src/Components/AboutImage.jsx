// src/components/AboutSlider.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import mission from "../assets/images/mission.jpg";
import vision from "../assets/images/vision.jpg";
import team from "../assets/images/team.jpg";
import history from "../assets/images/history.jpg";
import value from "../assets/images/value.jpg";
import celebration from "../assets/images/celebration.jpg";

import { useSpring, animated } from "@react-spring/web";

// Slider settings
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
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
    color: "#FFF", // Ensure the color is always white
  });

  return (
    <animated.h1
      style={props}
      className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      About Us
    </animated.h1>
  );
};

const AboutCard = ({ title, description, imgSrc }) => (
  <div
    className="bg-white rounded-2xl shadow-xl p-8 mx-4 my-4 flex flex-col justify-between"
    style={{ height: "450px" }}
  >
    <div className="mb-6 space-y-4 flex-grow">
      <h3 className="text-2xl font-semibold text-[#3b3b3b]">{title}</h3>
      <p className="mb-4">{description}</p>
    </div>
    <div className="flex justify-center items-center">
      <img
        src={imgSrc}
        className="w-auto h-40 rounded-md"
        alt="illustration"
        loading="lazy"
        style={{ width: "auto", height: "150px" }}
      />
    </div>
  </div>
);

const AboutSlider = () => {
  return (
    <div className="py-16 bg-[#3b3b3b]">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 text-[#3b3b3b]">
        <AnimatedH1 />
        <Slider {...sliderSettings}>
          <AboutCard
            title="Our Team"
            description="Meet the talented and dedicated team members who drive our company forward with their expertise and passion."
            imgSrc={team}
          />
          <AboutCard
            title="Our Mission"
            description="Discover our mission to provide exceptional value and service to our clients, making a positive impact in our industry."
            imgSrc={mission}
          />
          <AboutCard
            title="Our Values"
            description="Learn about the core values that guide our work ethic, ensuring integrity, collaboration, and excellence in everything we do."
            imgSrc={value}
          />
          <AboutCard
            title="Our History"
            description="Explore our journey from inception to where we are today, highlighting key milestones and achievements along the way."
            imgSrc={history}
          />
          <AboutCard
            title="Our Vision"
            description="Understand our vision for the future and the strategic goals we aim to achieve to continually advance and innovate."
            imgSrc={vision}
          />
          <AboutCard
            title="Achievements"
            description="Celebrate our significant accomplishments and awards that recognize our success and commitment to excellence."
            imgSrc={celebration}
          />
        </Slider>
      </div>
    </div>
  );
};

export default AboutSlider;
