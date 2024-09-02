import React from "react";
import { useSpring, animated } from "@react-spring/web";

const Card = ({ image, title, subtitle, description }) => {
  const [hovered, setHovered] = React.useState(false);

  const contentSpring = useSpring({
    transform: hovered ? "translateY(0)" : "translateY(150px)",
  });

  const descriptionSpring = useSpring({
    opacity: hovered ? 1 : 0,
    delay: hovered ? 250 : 0,
  });

  return (
    <article
      className="relative w-64 h-64 text-gray-900 bg-black overflow-hidden rounded-2xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0 flex justify-center items-center text-2xl font-bold text-white">
        <img src={image} alt="card" className="w-full h-full object-cover" />
      </div>
      <animated.div
        style={contentSpring}
        className="absolute left-0 bottom-0 w-full p-5 bg-gray-100 rounded-t-2xl"
      >
        <div className="relative">
          <div className="absolute top-[-47px] right-[-45px] w-24 h-24 transform rotate-[-175deg] rounded-full shadow-inner bg-gray-100"></div>
        </div>
        <span className="block font-bold text-black">{title}</span>
        <span className="block text-xs mb-2">{subtitle}</span>
        <animated.p style={descriptionSpring} className="text-sm">
          {description}
        </animated.p>
      </animated.div>
    </article>
  );
};

export default Card;
