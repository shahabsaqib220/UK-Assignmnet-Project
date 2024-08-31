import React from "react";
import { motion } from "framer-motion";
import Topbar from "./TopBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Ribbon from "./Ribbon";
import TawkChat from "./TawkToChat";
// Import your custom styles

const subjects = [
  {
    title: "IT Writing",
    description:
      "This writing service meets the unique demands of IT assignments with strict deadlines.",
    imageUrl:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpg",
  },
  {
    title: "Business Management Writing",
    description:
      "Tailored to meet the rigorous demands of business courses and requirements.",
    imageUrl:
      "https://images.unsplash.com/photo-1485988412941-77a35537dae4?q=80&w=2696&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpg",
  },
  {
    title: "Accounting Writing",
    description:
      "Ensures precision and accuracy for financial assignments and reports.",
    imageUrl:
      "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpg",
  },
  {
    title: "Engineering Writing",
    description:
      "Provides detailed and technical support for engineering projects and papers.",
    imageUrl:
      "https://images.unsplash.com/photo-1502465771179-51f3535da42c?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpg",
  },
  {
    title: "Sociology Writing",
    description:
      "Explores societal structures and dynamics, helping you excel in your studies.",
    imageUrl:
      "https://images.unsplash.com/photo-1508780709619-79562169bc64?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpg",
  },
  {
    title: "Finance Writing",
    description:
      "Covers all aspects of financial studies, from basic concepts to advanced analysis.",
    imageUrl:
      "https://images.pexels.com/photos/4476376/pexels-photo-4476376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2.jpg",
  },
  {
    title: "MBA Writing",
    description:
      "Supports your business education with top-quality essays, reports, and case studies.",
    imageUrl:
      "https://images.pexels.com/photos/7718689/pexels-photo-7718689.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load.jpg",
  },
  {
    title: "Economics Writing",
    description:
      "Delves into economic theories and practices, providing comprehensive support for coursework.",
    imageUrl:
      "https://images.pexels.com/photos/5053733/pexels-photo-5053733.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load.jpg",
  },
  {
    title: "Computer Science Writing",
    description:
      "Offers assistance with programming, algorithms, and tech research.",
    imageUrl:
      "https://images.pexels.com/photos/15595289/pexels-photo-15595289/free-photo-of-close-up-of-a-keyboard-and-a-notebook-with-a-handwritten-note.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load.jpg",
  },
  {
    title: "History Writing",
    description:
      "Explores past events and trends, helping you present well-researched historical papers.",
    imageUrl:
      "https://images.unsplash.com/photo-1513128034602-7814ccaddd4e?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpg",
  },
  {
    title: "Nursing Writing",
    description:
      "Supports healthcare education with detailed and accurate assignments.",
    imageUrl:
      "https://images.pexels.com/photos/1766604/pexels-photo-1766604.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load.jpg",
  },
  {
    title: "Law Writing",
    description:
      "Provides thorough and well-argued papers to support legal studies.",
    imageUrl:
      "https://images.pexels.com/photos/7060/man-people-space-desk.jpg?auto=compress&cs=tinysrgb&w=800&lazy=load.jpg",
  },
];

const SubjectCard = ({ subject, delay }) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.8, // Duration of the animation
      delay: delay,
      ease: "easeInOut", // Optional: Adjust easing for smoother animation
    }}
  >
    <img
      src={subject.imageUrl}
      alt={subject.title}
      className="w-full h-40 object-cover rounded-lg mb-4"
    />
    <h3 className="text-xl font-semibold">{subject.title}</h3>
    <p className="mt-2 text-gray-700">{subject.description}</p>
  </motion.div>
);

const Subjects = () => {
  return (
    <>
      <Ribbon />
      <TawkChat />
      <Topbar />
      <Navbar />
      <div className="py-10 px-6 bg-white">
        <h1 className="text-4xl font-bold text-center mb-12">
          Subjects We Offer
        </h1>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {subjects.map((subject, index) => (
              <SubjectCard key={index} subject={subject} delay={index * 0.9} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Subjects;
