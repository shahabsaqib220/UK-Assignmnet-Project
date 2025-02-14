import { useEffect } from "react";

const AdSenseComponent = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense Error:", e);
    }
  }, []);

  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8941573624435462"
    
        data-ad-format="auto"
      ></ins>
    </div>
  );
};

export default AdSenseComponent;
