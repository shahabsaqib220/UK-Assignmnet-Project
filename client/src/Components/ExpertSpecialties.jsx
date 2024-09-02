import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import experts1 from "../assets/images/experts1.jpg";
import experts2 from "../assets/images/experts2.jpg";
import experts3 from "../assets/images/experts3.jpg";
import experts4 from "../assets/images/experts4.jpg";

gsap.registerPlugin(ScrollTrigger);

const ExpertSpecialties = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      ".heading",
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        scrollTrigger: {
          trigger: ".heading",
          start: "top 75%",
        },
      }
    );
    gsap.fromTo(
      ".description",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        scrollTrigger: {
          trigger: ".description",
          start: "top 75%",
        },
      }
    );
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 5000, // Transition speed between slides
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 15000, // Stay duration for each slide
    arrows: false,
    adaptiveHeight: true,
    pauseOnHover: false,
    pauseOnFocus: false,
    beforeChange: (current, next) => handleBeforeChange(next),
    afterChange: (current) => handleAfterChange(current),
  };

  const handleBeforeChange = (next) => {
    // Wait for the slide to be fully in view before starting animations
    setTimeout(() => {
      // Animate the slide coming in from the left
      gsap.fromTo(
        `.slide-${next}`,
        { opacity: 0, x: -100, scale: 0.9, rotation: -10 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          rotation: 0,
          duration: 2,
          ease: "power3.out",
          stagger: 0.2,
        }
      );

      // Animate heading with a bounce effect
      gsap.fromTo(
        `.slide-${next} .heading`,
        { opacity: 0, y: -50, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 2,
          ease: "bounce.out",
          stagger: 0.2,
        }
      );

      // Animate description with a slight slide-up effect
      gsap.fromTo(
        `.slide-${next} .description`,
        { opacity: 0, y: 50, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 2,
          ease: "power3.out",
          stagger: 0.2,
        }
      );
    }, 0); // Delay for the slide-in animation
  };

  const handleAfterChange = (current) => {
    // Wait before starting the exit animation to allow the new slide to fully appear
    setTimeout(() => {
      // Animate the current slide going out with a zoom and spin effect
      gsap.to(`.slide-${current}`, {
        opacity: 0,
        x: 100,
        scale: 1.1,
        rotation: 10,
        duration: 2,
        ease: "power3.inOut",
        stagger: 0.2,
      });

      // Animate heading and description out with a fade and bounce effect
      gsap.to(`.slide-${current} .heading`, {
        opacity: 0,
        y: 50,
        scale: 0.8,
        duration: 2,
        ease: "power3.inOut",
        stagger: 0.2,
      });

      gsap.to(`.slide-${current} .description`, {
        opacity: 0,
        y: -50,
        scale: 0.8,
        duration: 2,
        ease: "power3.inOut",
        stagger: 0.2,
      });
    }, 8000); // 8 seconds delay for the new slide to stay before exiting the current slide
  };

  return (
    <div className="bg-white overflow-hidden ">
      <section className="sticky">
        <motion.div
          className="min-w-lg  sm:pt-24 pt-12 sm:pb-8 mx-auto text-center"
          initial="hidden"
          animate="visible"
        >
          <h1 className="heading font-extrabold leading-tight tracking-tight text-[#201515] text-4xl sm:text-5xl">
            <span className="block">Our Experts Specialties</span>
          </h1>
        </motion.div>
      </section>
      <div className="text-left">
        <Slider {...sliderSettings}>
          <div className="relative flex items-center w-full slide-0">
            <div className="relative items-center w-full px-5 mx-auto md:px-12 lg:px-16 max-w-7xl">
              <div className="relative flex-col items-start m-auto align-middle">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-24">
                  <motion.div
                    className="relative items-center m-auto lg:inline-flex md:order-first"
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="max-w-xl text-center lg:text-left">
                      <div className="heading">
                        <p className="text-3xl font-semibold tracking-tight text-[#201515] sm:text-5xl">
                          Thesis Writing
                        </p>
                        <p className="description max-w-xl mt-4 text-base tracking-tight text-gray-600">
                          Our thesis writing service offers expert guidance to
                          help you craft a compelling and well-researched
                          thesis. We focus on delivering original content
                          tailored to your specific topic and academic
                          requirements. With timely revisions and detailed
                          feedback.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    className="order-first block w-64 mt-12 aspect-square lg:mt-0"
                    initial="hidden"
                    animate="visible"
                    key={`image-${experts1}`}
                  >
                    <img
                      className="object-cover rounded-3xl object-center w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto lg:ml-auto"
                      alt="hero"
                      src={experts1}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex items-center w-full slide-1">
            <div className="relative items-center w-full px-5 mx-auto md:px-12 lg:px-16 max-w-7xl">
              <div className="relative flex-col items-start m-auto align-middle">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-24">
                  <motion.div
                    className="relative items-center m-auto lg:inline-flex md:order-first"
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="max-w-xl text-center lg:text-left">
                      <div className="heading">
                        <p className="text-3xl font-semibold tracking-tight text-[#201515] sm:text-5xl">
                          Assignments Editing
                        </p>
                        <p className="description max-w-xl mt-4 text-base tracking-tight text-gray-600">
                          Our assignment editing service ensures your work is
                          polished and error-free, enhancing clarity and
                          coherence. We provide thorough reviews to improve
                          structure, grammar, and overall quality, tailored.
                          With a focus on meeting deadlines.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    className="order-first block w-64 mt-12 aspect-square lg:mt-0"
                    initial="hidden"
                    animate="visible"
                    key={`image-${experts2}`}
                  >
                    <img
                      className="object-cover rounded-3xl object-center w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto lg:ml-auto"
                      alt="hero"
                      src={experts2}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex items-center w-full slide-2">
            <div className="relative items-center w-full px-5 mx-auto md:px-12 lg:px-16 max-w-7xl">
              <div className="relative flex-col items-start m-auto align-middle">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-24">
                  <motion.div
                    className="relative items-center m-auto lg:inline-flex md:order-first"
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="max-w-xl text-center lg:text-left">
                      <div className="heading">
                        <p className="text-3xl font-semibold tracking-tight text-[#201515] sm:text-5xl">
                          Dissertation Writing
                        </p>
                        <p className="description max-w-xl mt-4 text-base tracking-tight text-gray-600">
                          Our dissertation writing service offers expert
                          assistance to help you develop a comprehensive and
                          well-structured dissertation. We focus on creating
                          original content that meets your academic standards,
                          research goals and requirements.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    className="order-first block w-64 mt-12 aspect-square lg:mt-0"
                    initial="hidden"
                    animate="visible"
                    key={`image-${experts4}`}
                  >
                    <img
                      className="object-cover rounded-3xl object-center w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto lg:ml-auto"
                      alt="hero"
                      src={experts4}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex items-center w-full slide-3">
            <div className="relative items-center w-full px-5 mx-auto md:px-12 lg:px-16 max-w-7xl">
              <div className="relative flex-col items-start m-auto align-middle">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-24">
                  <motion.div
                    className="relative items-center m-auto lg:inline-flex md:order-first"
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="max-w-xl text-center lg:text-left">
                      <div className="heading">
                        <p className="text-3xl font-semibold tracking-tight text-[#201515] sm:text-5xl">
                          Any Kind Assignment
                        </p>
                        <p className="description max-w-xl mt-4 text-base tracking-tight text-gray-600">
                          Our assignment service covers any type of assignment,
                          providing tailored support to meet your specific
                          needs. Whether it's essays, research papers, or case
                          studies, we deliver original content, on time. Our
                          experts ensure each assignment is well-researched.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    className="order-first block w-64 mt-12 aspect-square lg:mt-0"
                    initial="hidden"
                    animate="visible"
                    key={`image-${experts3}`}
                  >
                    <img
                      className="object-cover rounded-3xl object-center w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto lg:ml-auto"
                      alt="hero"
                      src={experts3}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default ExpertSpecialties;
