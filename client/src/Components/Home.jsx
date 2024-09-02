import React from "react";
import Navbar from "./Navbar";
import Herosection from "./Herosection";
import Services from "./Services";
import Events from "./Events";
import Footer from "./Footer";
import Card from "./Card";

import TopBar from "./TopBar";
import Info from "./Info";
import TawkToChat from "./TawkToChat";
import CardSlider from "./Card";
import Ribbon from "./Ribbon";
import TawkChat from "./TawkToChat";

const Home = () => {
  return (
    <>
      <Ribbon />
      <TawkChat />
      <TopBar />
      <Navbar />
      <Info />

      <Services />
      <Card />
      <Events />

      <Footer />
    </>
  );
};

export default Home;
