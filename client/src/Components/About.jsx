import React, { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { motion, useAnimation } from "framer-motion";
import AboutHero from "./AboutHero";
import TopBar from "./TopBar";
import AboutImage from "./AboutImage";

import anykind from "../assets/images/anykind.jpg";
import editing from "../assets/images/editing.jpg";
import dissertation from "../assets/images/dissertation.jpg";
import thesis from "../assets/images/thesis.jpg";
import tools from "../assets/images/tools.jpg";
import delivery from "../assets/images/delivery.jpg";
import work from "../assets/images/work.jpg";
import original from "../assets/images/original.jpg";
import ExpertSpecialties from "./ExpertSpecialties";
import ArtofTechnology from "./ArtofTechnology";
import Ribbon from "./Ribbon";
import TawkChat from "./TawkToChat";

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

const About = () => {
  const cardsData = [
    {
      image: thesis,
      title: "Thesis Writing",

      description:
        "Our thesis writing service offers expert guidance to help you craft a compelling and well-researched thesis. We focus on delivering original content tailored to your specific topic and academic requirements. With timely revisions and detailed feedback",
    },
    {
      image: editing,
      title: "Assignments Editing",

      description:
        "Our assignment editing service ensures your work is polished and error-free, enhancing clarity and coherence. We provide thorough reviews to improve structure, grammar, and overall quality, tailored. With a focus on meeting deadlines.",
    },
    {
      image: dissertation,
      title: "Dissertation Writing",

      description:
        "Our dissertation writing service offers expert assistance to help you develop a comprehensive and well-structured dissertation. We focus on creating original content that meets your academic standards, research goals and requirements.",
    },
    {
      image: anykind,
      title: "Any Kind Assignment",

      description:
        "Our assignment service covers any type of assignment, providing tailored support to meet your specific needs. Whether it's essays, research papers, or case studies, we deliver original content, on time. Our experts ensure each assignment is well-researched.",
    },
  ];
  const stateData = [
    {
      image: tools,
      title: "Modern Tools",

      description:
        "We use modern tools to enhance the quality and efficiency of our services. These advanced technologies help us deliver precise, up-to-date, and well-researched content, ensuring that every project meets the highest standards.",
    },
    {
      image: work,
      title: "Originality in Projects",

      description:
        "We prioritize originality in every project, ensuring that all work is unique and tailored specifically to your needs. Our commitment to fresh, creative solutions guarantees that your project stands out and maintains academic integrity.",
    },
    {
      image: original,
      title: "Original Work",

      description:
        "We deliver original work that is crafted uniquely for your needs. Our focus on authenticity ensures that every project is distinctive and tailored to your requirements,to meet your specific needs. Our commitment to authenticity ensures that every project.",
    },
    {
      image: delivery,
      title: "Timely Delivery",

      description:
        "We also guarantee timely delivery, so you receive high-quality content when you need it, Your's all projects, ensuring you receive high-quality work exactly when you need it. Our efficient process keeps you on track with deadlines without compromising on quality.",
    },
  ];
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setIsVisible(false); // Scrolling down
    } else {
      setIsVisible(true); // Scrolling up
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <Ribbon />
      <TawkChat />
      <TopBar />
      <Navbar />

      <AboutImage />
      <ExpertSpecialties />
      <AboutHero />
      <ArtofTechnology />

      {/* <div className="bg-white">
        <ScrollReveal>
          <section className="text-center py-12 px-4">
            <h2 className="text-2xl font-bold">
              Committed To Your Work And Happiness
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
              <div className="p-4 shadow-lg rounded-lg bg-gray-300 hover:bg-gray-900 hover:text-white transition-colors">
                <h3 className="text-xl font-bold">Quality</h3>
              </div>
              <div className="p-4 shadow-lg rounded-lg  bg-gray-300 hover:bg-gray-900 hover:text-white transition-colors">
                <h3 className="text-xl font-bold">Timeliness</h3>
              </div>
              <div className="p-4 shadow-lg rounded-lg bg-gray-300 hover:bg-gray-900 hover:text-white transition-colors">
                <h3 className="text-xl font-bold">Originality</h3>
              </div>
              <div className="p-4 shadow-lg rounded-lg bg-gray-300 hover:bg-gray-900 hover:text-white transition-colors">
                <h3 className="text-xl font-bold">Customer Satisfaction</h3>
              </div>
            </div>
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section className="bg-gray-500 text-white text-center py-12 px-4">
            <h2 className="text-2xl font-bold">Students Testimonials</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 max-w-5xl mx-auto">
              <div className="p-4 shadow-lg rounded-lg bg-gray-900 text-white hover:bg-white hover:text-black  transition-colors">
                <p>
                  "Your assignment has a clear and logical structure, making it
                  easy to follow and understand. You've demonstrated thorough
                  research and a deep understanding of the topic."
                </p>
                <h3 className="mt-4 font-bold">Emily Harris</h3>
              </div>
              <div className="p-4 shadow-lg rounded-lg bg-gray-900 text-white hover:bg-white hover:text-black  transition-colors">
                <p>
                  "The conclusion could benefit from a more explicit restatement
                  of the research significance and practical implications.
                  Overall, they are the best."
                </p>
                <h3 className="mt-4 font-bold">Charlotte Richardson</h3>
              </div>
              <div className="p-4 shadow-lg rounded-lg bg-gray-900 text-white hover:bg-white hover:text-black  transition-colors">
                <p>
                  "Your college assignment is well-organized and demonstrates a
                  clear understanding of the subject. The introduction
                  effectively outlines the main objectives."
                </p>
                <h3 className="mt-4 font-bold">James Stewart</h3>
              </div>
            </div>
          </section>
        </ScrollReveal>
        </div> */}
      <Footer />
    </>
  );
};

export default About;
