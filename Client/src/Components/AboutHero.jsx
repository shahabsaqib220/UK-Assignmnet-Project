import React from "react";

const AboutHero = () => {
  return (
    <section className="sm:mt-6 lg:mt-8 bg-[#3b3b3b]  mt-12 max-w-screen mx-auto px-4 sm:px-6 lg:px-8">
      <div className="my-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 flex gap-3 lg:flex-justify lg:flex flex-col lg:flex-row">
        <div className="sm:text-center lg:text-left">
          <h1 className="text-4xl tracking-tight  mt-14 font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block xl:inline">Enrich your's </span>
            <span className="block text-white xl:inline">Assignment Work!</span>
          </h1>
          <p className="mt-3 text-base  text-white sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            Enhance your assignment with our expert guidance and support.
            Elevate your academic work with our professional writing services.
            Enrich your assignments with thorough research and meticulous
            attention to detail.
          </p>
          {/* Button Section */}
        </div>
        {/*   Image Section     */}
        <div className="lg:inset-y-0 mt-20 lg:right-0 lg:w-1/2  my-6">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpg" // Replace with the URL of the image you want to use
            alt="About Us"
            className="rounded-xl"
            style={{
              height: 250,
              width: "100%", // Ensures the image takes full width of its container
              objectFit: "cover", // Ensures the image covers the specified height while preserving its aspect ratio
            }}
          />
        </div>

        {/*   End of Image Section     */}
      </div>
    </section>
  );
};

export default AboutHero;
