import { useAnimation } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { connect, useSelector } from "react-redux";
import { saveOrderDetails } from "../Redux/actions/orderActions";
import Navbar from "./Navbar";
import Footer from "./Footer";

import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import ReactInputMask from "react-input-mask";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sale from "../assets/images/sale.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import cover from "../assets/images/cover.jpeg";
import video from "../assets/videos/ordornowvid.mp4";

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

const Info = () => {
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
  };

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [paperType, setPaperType] = useState("");
  const [academicLevel, setAcademicLevel] = useState("");
  const [wordCount, setWordCount] = useState(1000);
  const [deadline, setDeadline] = useState("");
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [sliderValue, setSliderValue] = useState(0);
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setSliderValue(next),
  };
  const [problemFile, setProblemFile] = useState(null);
  const [requirementFile, setRequirementFile] = useState(null);
  const [descriptionFile, setDescriptionFile] = useState(null);
  const [files, setFiles] = useState([]); // Keeping this if you still need it for general file operations
  const [problemFileUploaded, setProblemFileUploaded] = useState(false);
  const [requirementFileUploaded, setRequirementFileUploaded] = useState(false);
  const [descriptionFileUploaded, setDescriptionFileUploaded] = useState(false);

  const navigate = useNavigate();

  const handleWordCountChange = (e) => {
    setWordCount(e.target.value);
  };

  const handleFilesChange = (event, type) => {
    const selectedFile = event.target.files[0]; // Only allowing one file per input
    if (selectedFile) {
      if (!validateFiles(selectedFile)) {
        return;
      }
      if (type === "problem") {
        setProblemFile(selectedFile);
        setProblemFileUploaded(true); // Update the state to show the next input
      } else if (type === "requirement") {
        setRequirementFile(selectedFile);
        setRequirementFileUploaded(true); // Update the state to show the next input
      } else if (type === "description") {
        setDescriptionFile(selectedFile);
        setDescriptionFileUploaded(true); // Update the state to show the next input
      }
    }
  };

  const clearFile = (type) => {
    if (type === "problem") {
      setProblemFile(null);
      document.getElementById("problemFile").value = ""; // Clear the file input value
    } else if (type === "requirement") {
      setRequirementFile(null);
      document.getElementById("requirementFile").value = ""; // Clear the file input value
    } else if (type === "description") {
      setDescriptionFile(null);
      document.getElementById("descriptionFile").value = ""; // Clear the file input value
    }
  };

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleChange = (event) => {
    setPaperType(event.target.value);
  };

  const academicLevelHandleChange = (event) => {
    setAcademicLevel(event.target.value);
  };

  const handleDeadline = (event) => {
    setDeadline(event.target.value);
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !inputValues.name ||
      !inputValues.email ||
      !inputValues.phone ||
      !paperType ||
      !academicLevel ||
      !wordCount ||
      !deadline
    ) {
      Swal.fire({
        title: "Error!",
        text: "Please fill out all fields!",
        icon: "error",
      });
      return false;
    }

    if (!emailRegex.test(inputValues.email)) {
      Swal.fire({
        title: "Error!",
        text: "Please enter a valid email address.",
        icon: "error",
      });
      return false;
    }

    if (!/^\d{11}$/.test(inputValues.phone)) {
      Swal.fire({
        title: "Error!",
        text: "Please enter a valid 11-digit phone number.",
        icon: "error",
      });
      return false;
    }

    if (!files) {
      Swal.fire({
        title: "Error!",
        text: "Please select a file.",
        icon: "error",
      });
      return false;
    }

    return true;
  };

  const validateFiles = (file) => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
      "image/gif",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes

    if (!validTypes.includes(file.type)) {
      Swal.fire({
        title: "Invalid File Type",
        text: "Please upload a PDF, Word document, or image file.",
        icon: "warning",
      });
      return false;
    }

    if (file.size > maxSize) {
      Swal.fire({
        title: "File Too Large",
        text: "File size exceeds 5MB. Please select a smaller file.",
        icon: "warning",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        title: "Form Incomplete",
        text: "Please fill in all required fields before submitting the order.",
        icon: "warning",
      });
      return;
    }

    // Check if at least one file is provided
    if (!problemFile && !requirementFile && !descriptionFile) {
      Swal.fire({
        title: "File Missing",
        text: "Please upload at least one file.",
        icon: "warning",
      });
      return;
    }
    const orderDetails = {
      name: inputValues.name,
      email: inputValues.email,
      phone: inputValues.phone,
      paperType,
      academicLevel,
      wordCount,
      deadline,
      problemFile: problemFile, // Assuming problemFile is a file object or null
      requirementFile: requirementFile, // Assuming requirementFile is a file object or null
      descriptionFile: descriptionFile, // Assuming descriptionFile is a file object or null
    };

    // Save order details to Redux store
    dispatch(saveOrderDetails(orderDetails));

    Swal.fire({
      title: "Good job!",
      text: "Order details saved! Proceed to payment.",
      icon: "success",
    });

    // Redirect to Stripe form
    navigate("/stripe-form");
  };

  const AnimatedHeading = () => {
    return (
      <motion.h1
        className="text-5xl font-bold leading-tight mb-4"
        initial={{
          color: "#F4CE14",
        }}
        animate={{
          color: [
            "#F4CE14",
            "#059212",
            "#071952",
            "#402E7A",
            "#102C57",
            "#FFF455",
            "#AF47D2",
            "#850F8D",
            "#FF0000",
            "#6C0345",
            "#8644A2",
            "#FF204E",
          ],
        }}
        transition={{ duration: 100, repeat: Infinity, repeatType: "loop" }}
      >
        Welcome to UK Assignment Writing Help!
      </motion.h1>
    );
  };

  return (
    <>
      <div
        className="p-6 flex items-center justify-center md:flex-col"
        style={{
          backgroundImage: `url(${cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="bg-white rounded shadow-lg p-4 md:p-8 mb-6">
              <div className="grid gap-4 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="relative md:block md:col-span-3 lg:col-span-1 text-black">
                  <video
                    autoPlay
                    loop
                    muted
                    className="w-full h-auto lg:h-96"
                    style={{
                      height: 380,
                    }}
                    onLoadedMetadata={(e) =>
                      (e.target.playbackRate = e.target.duration / 7)
                    }
                  >
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <img
                    src={sale}
                    alt="Sale"
                    className="lg:w-64 md:w-8 sm:w-6 w-64 mx-4 h-auto -mt-7 animate-tadaLoop"
                  />

                  <div className="absolute top-0 left-0 z-10 p-4 bg-white bg-opacity-75">
                    <p className="font-medium text-lg">Personal Details</p>
                    <p>Please fill out all the fields.</p>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="grid gap-3 text-sm grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                    <div className="md:col-span-2 font-semibold">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        defaultValue=""
                        placeholder="John Doe"
                        required
                        value={inputValues.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="md:col-span-1 font-semibold">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        defaultValue=""
                        placeholder="example@gmail.com"
                        required
                        value={inputValues.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="md:col-span-1 font-semibold">
                      <label htmlFor="phone">Phone</label>
                      <ReactInputMask
                        mask="99999999999"
                        maskChar=""
                        type="text"
                        name="phone"
                        id="phone"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        defaultValue=""
                        placeholder="+44XXXXXXXXX"
                        required
                        value={inputValues.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="md:col-span-1 font-semibold">
                      <label htmlFor="paperType">Select Your Paper Type</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <select
                          id="paperType"
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          value={paperType}
                          onChange={handleChange}
                        >
                          <option value="">Select Paper Type</option>
                          <option value="Essay">Essay</option>
                          <option value="Dissertation">Dissertation</option>
                          <option value="Assignment">Assignment</option>
                          <option value="Case Study">Case Study</option>
                          <option value="Research Report">
                            Research Report
                          </option>
                          <option value="Course Work">Course Work</option>
                          <option value="Research Proposal">
                            Research Proposal
                          </option>
                          <option value="Exam">Exam</option>
                          <option value="Thesis">Thesis</option>
                          <option value="Literature Review">
                            Literature Review
                          </option>
                          <option value="Report">Report</option>
                          <option value="Editing and Proofreading">
                            Editing and Proofreading
                          </option>
                          <option value="Creative Writing">
                            Creative Writing
                          </option>
                          <option value="Copy Writing">Copy Writing</option>
                          <option value="Personal Statement">
                            Personal Statement
                          </option>
                          <option value="Capstone Project">
                            Capstone Project
                          </option>
                          <option value="Research Paper">Research Paper</option>
                        </select>
                      </div>
                    </div>
                    <div className="md:col-span-1 font-semibold">
                      <label htmlFor="academicLevel">
                        Select Your Academic Level
                      </label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <select
                          name="state"
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          id="academicLevel"
                          value={academicLevel}
                          onChange={academicLevelHandleChange}
                        >
                          <option value="">Select Academic Level</option>
                          <option value="High School">High School</option>
                          <option value="Undergraduate">Undergraduate</option>
                          <option value="Post Graduate">Post Graduate</option>
                          <option value="PhD">PhD</option>
                        </select>
                      </div>
                    </div>
                    <div className="md:col-span-1 font-semibold">
                      <label htmlFor="wordCount">No Of Words</label>
                      <select
                        id="wordCount"
                        value={wordCount}
                        onChange={handleWordCountChange}
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      >
                        {[...Array(19).keys()].map((i) => (
                          <option key={i} value={(i + 2) * 500}>
                            {(i + 2) * 500}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2 font-semibold">
                      <label htmlFor="deadline">Select Deadline</label>
                      <input
                        id="deadline"
                        type="date"
                        value={deadline}
                        min={getCurrentDate()}
                        onChange={handleDeadline}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        required
                      />
                      <div className="flex mt-3 flex-wrap">
                        <div className="w-full md:w-1/3 px-2 mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="problemFile"
                          >
                            Upload Files
                          </label>
                          <input
                            className="hidden" // Hide the actual file input
                            id="problemFile"
                            type="file"
                            accept=".jpg, .jpeg, .png, .doc, .docx, .pdf, .ppt, .pptx"
                            onChange={(e) => handleFilesChange(e, "problem")}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              document.getElementById("problemFile").click()
                            }
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex items-center justify-center"
                          >
                            {problemFile ? problemFile.name : "Upload File"}
                          </button>
                        </div>

                        {problemFile && (
                          <div className="w-full md:w-1/3 px-2 mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="requirementFile"
                            >
                              Add More Files
                            </label>
                            <input
                              className="hidden" // Hide the actual file input
                              id="requirementFile"
                              type="file"
                              accept=".jpg, .jpeg, .png, .doc, .docx, .pdf, .ppt, .pptx"
                              onChange={(e) =>
                                handleFilesChange(e, "requirement")
                              }
                            />
                            <button
                              type="button"
                              onClick={() =>
                                document
                                  .getElementById("requirementFile")
                                  .click()
                              }
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex items-center justify-center"
                            >
                              {requirementFile
                                ? requirementFile.name
                                : "Upload File"}
                            </button>
                          </div>
                        )}

                        {problemFile && requirementFile && (
                          <div className="w-full md:w-1/3 px-2 mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="descriptionFile"
                            >
                              Add More Files
                            </label>
                            <input
                              className="hidden" // Hide the actual file input
                              id="descriptionFile"
                              type="file"
                              accept=".jpg, .jpeg, .png, .doc, .docx, .pdf, .ppt, .pptx"
                              onChange={(e) =>
                                handleFilesChange(e, "description")
                              }
                            />
                            <button
                              type="button"
                              onClick={() =>
                                document
                                  .getElementById("descriptionFile")
                                  .click()
                              }
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex items-center justify-center"
                            >
                              {descriptionFile
                                ? descriptionFile.name
                                : "Upload File"}
                            </button>
                          </div>
                        )}
                      </div>
                      <p className="w-full text-gray-600 text-sm px-2 mb-4">
                        Only accept Images, pdf, word, and powerpoint files.
                      </p>
                    </div>

                    <div className="md:col-span-2 text-right">
                      <div className="inline-flex items-end mt-6">
                        <button
                          className="bg-[#3b3b3b] hover:bg-black hover:text-white hover:font-bold text-white py-2 px-4 rounded-md"
                          onClick={handleSubmit}
                        >
                          Proceed
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = {
  saveOrderDetails,
};

export default connect(null, mapDispatchToProps)(Info);
