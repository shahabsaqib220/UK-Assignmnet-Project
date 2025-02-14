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

import AdSenseComponent from "./AdSense";

const Home = () => {
  return (
    <>
      <Ribbon />
      <TawkChat />
      <AdSenseComponent/>
      <TopBar />
      <Navbar />
      <Info />
      <AdSenseComponent/>

      <Services />
      <AdSenseComponent/>
      <Card />
      <Events />
      <AdSenseComponent/>

      <Footer />
    </>
  );
};

export default Home;
