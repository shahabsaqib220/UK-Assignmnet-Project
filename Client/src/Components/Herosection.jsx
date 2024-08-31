import React, { useEffect, useRef, useState } from "react";
import Discount from "./Discount";

import { motion, useAnimation } from "framer-motion";
import Info from "./Info";

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

const AnimatedHeading = () => {
  return (
    <ScrollReveal>
      <motion.h1
        className="text-5xl font-bold leading-tight mb-4"
        animate={{ color: ["#FFD700", "#FF4500", "#1E90FF", "#FFD700"] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "loop" }}
      >
        Welcome to Awesome Website
      </motion.h1>
    </ScrollReveal>
  );
};

const Herosection = () => {
  return (
    <>
      <motion.div
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1522252234503-e356532cafd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxjb2RlfGVufDB8MHx8fDE2OTQwOTg0MTZ8MA&ixlib=rb-4.0.3&q=80&w=1080"
              alt="Background Image"
              className="object-cover object-center w-full h-full"
            />
            <div className="absolute inset-0 bg-black opacity-50" />
          </div>
          <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
            {/* <h1 className="text-5xl font-bold leading-tight mb-4">
            Welcome to Our Awesome Website
            </h1> */}

            <ScrollReveal>
              <AnimatedHeading />
              <p className="text-lg text-gray-300 mb-8">
                Discover amazing features and services that await you.
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <a
                href="#"
                className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              >
                Get Started
              </a>
            </ScrollReveal>
          </div>
        </div>
        <Info />
      </motion.div>
    </>
  );
};

export default Herosection;
