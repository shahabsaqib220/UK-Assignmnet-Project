// src/components/AboutSlider.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";

import CuttingEdgeWritingTools from "../assets/images/CuttingEdgeWritingTools.jpg";
import EfficientManagement from "../assets/images/EfficientManagement.jpg";
import ExpertResearchandSources from "../assets/images/ExpertResearchandSources.jpg";
import OriginalandPlagiarismFreeContent from "../assets/images/OriginalandPlagiarismFreeContent.jpg";
import PersonalizedRevision from "../assets/images/PersonalizedRevision.jpg";
import ProfessionalFormattingandPresentation from "../assets/images/ProfessionalFormattingandPresentation.jpg";

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
    color: "#3b3b3b", // Ensure the color is always white
  });

  return (
    <animated.h1
      style={props}
      className="text-4xl text-[#3b3b3b] md:text-5xl lg:text-6xl font-bold text-center mb-12 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      Expertise
    </animated.h1>
  );
};

const AboutCard = ({ title, description, imgSrc }) => (
  <div
    className="bg-[#3b3b3b] text-white  rounded-2xl shadow-xl p-8 mx-4 my-4 flex flex-col justify-between"
    style={{ height: "450px" }}
  >
    <div className="mb-6 space-y-4 flex-grow">
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
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
    <>
     <div className="py-16 bg-white">
  <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 text-black">
    <AnimatedH1 />
    <Slider {...sliderSettings}>
      <AboutCard
        title="Cutting-Edge Writing Tools"
        description="Utilize advanced writing tools like Grammarly and Hemingway Editor to ensure grammatical accuracy, clarity, and style."
        imgSrc={CuttingEdgeWritingTools}
      />
      <AboutCard
        title="Original and Plagiarism-Free Content"
        description="Discover our mission to provide exceptional value and service to our clients, making a positive impact in our industry."
        imgSrc={OriginalandPlagiarismFreeContent}
      />
      <AboutCard
        title="Expert Research and Sources"
        description="Leverage access to academic databases and libraries to provide well-researched, evidence-backed content, enhancing the credibility and depth of every piece of written work."
        imgSrc={ExpertResearchandSources}
      />
      <AboutCard
        title="Efficient Management"
        description="Employ project management tools and strict deadlines to ensure timely delivery of assignments, meeting student needs promptly and maintaining high standards of service."
        imgSrc={EfficientManagement}
      />
      <AboutCard
        title="Personalized Revision"
        description="Offer detailed, personalized feedback and multiple revisions based on student input, ensuring that each piece of work meets their specific requirements and expectations."
        imgSrc={PersonalizedRevision}
      />
      <AboutCard
        title="Professional Formatting and Presentation"
        description="Utilize modern formatting tools and templates to ensure that all written work adheres to academic standards and presents information clearly and professionally."
        imgSrc={ProfessionalFormattingandPresentation}
      />
    </Slider>
  </div>
</div>

    </>
  );
};

export default AboutSlider;
