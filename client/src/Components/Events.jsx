import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";

const data = [
  {
    title: "Expert Tutors",
    description:
      "Our tutors are highly qualified professionals from top UK universities, specializing in various subjects. They provide expert guidance, ensuring high-quality support and clear explanations tailored to your academic needs.",
    image:
      "https://images.pexels.com/photos/7092346/pexels-photo-7092346.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load.jpeg",
  },
  {
    title: "Tailored Solutions",
    description:
      "We offer customized assignment assistance to fit your specific requirements. Whether it’s an essay, dissertation, or case study, we tailor our services to align with your academic goals and deliver personalized solutions.",
    image:
      "https://images.pexels.com/photos/6684255/pexels-photo-6684255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2.jpeg",
  },
  {
    title: "Timely Delivery",
    description:
      "We guarantee prompt delivery of your assignments, ensuring you have ample time to review and make adjustments. Our commitment to meeting deadlines helps you stay on track with your academic schedule. So Order Now!",
    image:
      "https://images.pexels.com/photos/1314544/pexels-photo-1314544.jpeg?auto=compress&cs=tinysrgb&w=800.jpeg",
  },
];

const data1 = [
  {
    title: "Affordable Pricing",
    description:
      "We provide high-quality assignment help at competitive rates. Our pricing structure is designed to be accessible to students, with various discounts and promotions to enhance affordability.",
    image:
      "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpeg",
  },
  {
    title: "24/7 Support",
    description:
      "Our customer support team is available 24/7 to assist with any queries or concerns. From placing orders to tracking progress, we offer continuous support to ensure a smooth experience.",
    image:
      "https://images.unsplash.com/photo-1519223400710-6da9e1b777ea?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpeg",
  },
  {
    title: "High-Quality Work",
    description:
      "Our service is committed to delivering top-notch, original work. We adhere to strict academic standards and conduct thorough research to produce well-structured and plagiarism-free assignments.",
    image:
      "https://images.unsplash.com/photo-1631611114026-8df828ba1ab2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpeg",
  },
];

const WhyChooseUs = () => {
  const [index, setIndex] = useState(0);

  const props = useSpring({
    opacity: 1,
    transform: "translateX(0)",
    from: { opacity: 0, transform: "translateX(-50px)" },
    reset: true,
    config: { duration: 1000 },
    onRest: () => {
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % data.length);
      }, 3000); // Stay on screen for 3 seconds
    },
  });

  return (
    <>
      <h1 className="bg-white text-black font-extrabold text-4xl flex justify-center items-center mt-6 mb-3">
        Why Choose Us
      </h1>
      <hr className="bg-black text-2xl" />
      <section style={styles.whyChooseUs}>
        <div style={styles.container}>
          <animated.div style={{ ...styles.section, ...props }}>
            <div style={styles.item}>
              <img
                src={data[index].image}
                alt={data[index].title}
                style={styles.image}
              />
              <div style={styles.text}>
                <h2 style={styles.title}>{data[index].title}</h2>
                <p style={styles.description}>{data[index].description}</p>
              </div>
            </div>
          </animated.div>
        </div>
        <div style={styles.container}>
          <animated.div style={{ ...styles.section, ...props }}>
            <div style={styles.item}>
              <img
                src={data1[index].image}
                alt={data1[index].title}
                style={styles.image}
              />
              <div style={styles.text}>
                <h2 style={styles.title}>{data1[index].title}</h2>
                <p style={styles.description}>{data1[index].description}</p>
              </div>
            </div>
          </animated.div>
        </div>
      </section>
    </>
  );
};

const styles = {
  whyChooseUs: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#FFFF",
    position: "relative",
    // Ensure it is above other elements
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
    overflow: "hidden",
    position: "relative",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    marginBottom: "20px",
    width: "100%",
    justifyContent: "center",
    flexWrap: "wrap", // Allows items to wrap on small screens
  },
  text: {
    maxWidth: "600px",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover", // Ensures the image covers the area without distortion
    borderRadius: "50%",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginRight: "20px",
    flexShrink: 0, // Prevents the image from shrinking
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#1f2937",
  },
  description: {
    fontSize: "18px",
    color: "#4b5563",
    marginTop: "10px",
  },
};

// Add responsive styling
const responsiveStyles = `
  @media (max-width: 768px) {
    .item {
      flex-direction: column; // Stack image and text vertically on small screens
      align-items: flex-start; // Align items to start
    }
    .image {
      margin-right: 0;
      margin-bottom: 10px; // Space between image and text
    }
  }
`;

export default WhyChooseUs;
