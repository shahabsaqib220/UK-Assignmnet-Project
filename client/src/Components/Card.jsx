import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, useAnimation } from "framer-motion";
import Process from "./Process";

const ScrollReveal = ({ children }) => {
  const controls = useAnimation();
  const [elementIsVisible, setElementIsVisible] = useState(false);
  const ref = useRef();

  const handleScroll = () => {
    const { top } = ref.current.getBoundingClientRect();
    if (top <= window.innerHeight * 0.75) {
      setElementIsVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (elementIsVisible) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
      });
    }
  }, [elementIsVisible, controls]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={controls}>
      {children}
    </motion.div>
  );
};

const CardSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    centerMode: true, // Centers the active slide
    centerPadding: "20px", // Adds space around the active slide
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
          centerMode: true,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          centerMode: true,
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <>
      <Process />
      <ScrollReveal>
        <section className="py-16 bg-[#3b3b3b]">
          <div className="mx-auto px-6 max-w-6xl text-gray-800">
            <h2 className="text-4xl font-bold mb-8 text-center text-white">
              What Our Students Say
            </h2>
            <Slider {...settings}>
              <div className="flex justify-center p-4">
                {" "}
                {/* Added padding */}
                <div className="overflow-hidden relative p-8 rounded-xl bg-white shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                  <div className="text-center space-y-4">
                    <h2 className="text-xl font-medium text-gray-900">
                      Sarah L., University of Oxford
                    </h2>
                    <p className="text-gray-700">
                      Amazing service! The quality of the assignment exceeded my
                      expectations. The writer followed all the guidelines and
                      delivered it before the deadline. I'll definitely use this
                      service again.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center p-4">
                {" "}
                {/* Added padding */}
                <div className="overflow-hidden relative p-8 rounded-xl bg-white shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                  <div className="text-center space-y-4">
                    <h2 className="text-xl font-medium text-gray-900">
                      James T., University of Cambridge
                    </h2>
                    <p className="text-gray-700">
                      I was struggling with my dissertation, but this service
                      was a lifesaver. The writer provided valuable insights and
                      the final paper was thorough and well-researched. Highly
                      recommended.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center p-4">
                {" "}
                {/* Added padding */}
                <div className="overflow-hidden relative p-8 rounded-xl bg-white shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                  <div className="text-center space-y-4">
                    <h2 className="text-xl font-medium text-gray-900">
                      Emma W., King's College London
                    </h2>
                    <p className="text-gray-700">
                      Fast, reliable, and professional. I needed a last-minute
                      assignment, and they delivered a high-quality paper within
                      24 hours. Great communication throughout the process.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center p-4">
                {" "}
                {/* Added padding */}
                <div className="overflow-hidden relative p-8 rounded-xl bg-white shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                  <div className="text-center space-y-4">
                    <h2 className="text-xl font-medium text-gray-900">
                      Chloe S., University of Edinburgh
                    </h2>
                    <p className="text-gray-700">
                      I had a great experience with this service. The assignment
                      was well-written, and all the sources were properly cited.
                      The turnaround time was quick, and the price was
                      reasonable. Thank you!
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center p-4">
                {" "}
                {/* Added padding */}
                <div className="overflow-hidden relative p-8 rounded-xl bg-white shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                  <div className="text-center space-y-4">
                    <h2 className="text-xl font-medium text-gray-900">
                      Jack H., University of Glasgow
                    </h2>
                    <p className="text-gray-700">
                      The best part about this service is their attention to
                      detail. The assignments are meticulously written and
                      thoroughly proofread. I've always received top grades for
                      the papers they have done for me.
                    </p>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
};

export default CardSlider;
