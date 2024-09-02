import React, { useEffect } from "react";

const TawkChat = () => {
  useEffect(() => {
    // Function to load the Tawk.to widget script
    const loadTawkScript = () => {
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();

      const script = document.createElement("script");
      script.async = true;
      script.src = "https://embed.tawk.to/667fe50deaf3bd8d4d164b6b/1i1hpdfva";
      script.charset = "UTF-8";
      script.setAttribute("crossorigin", "*");
      document.body.appendChild(script);
    };

    // Function to adjust chat box size and hide unwanted text
    const adjustChatBox = () => {
      const chatBox = document.querySelector(".tawk-chat-box iframe");
      if (chatBox) {
        chatBox.style.height = "400px";
        chatBox.style.width = "300px";
        chatBox.style.minHeight = "auto";
        chatBox.style.minWidth = "auto";
        chatBox.style.maxHeight = "400px";
        chatBox.style.maxWidth = "300px";
        chatBox.style.overflow = "hidden";
        chatBox.style.position = "fixed";
      }
    };

    // Function to hide "We are Here" text
    const hideWeAreHereText = () => {
      const weAreHereElement = document.querySelector(
        ".tawk-status-message-container"
      );
      if (weAreHereElement) {
        weAreHereElement.style.display = "none";
      } else {
        setTimeout(hideWeAreHereText, 500); // Retry if element not found
      }
    };

    // Handle the widget state (minimized or maximized)
    const handleWidgetState = () => {
      const widgetState =
        localStorage.getItem("tawkWidgetState") || "minimized";
      if (widgetState === "minimized") {
        window.Tawk_API.toggle();
      }

      window.Tawk_API.onChatMinimized = () => {
        localStorage.setItem("tawkWidgetState", "minimized");
      };

      window.Tawk_API.onChatMaximized = () => {
        localStorage.setItem("tawkWidgetState", "maximized");
      };
    };

    // Check if Tawk_API is loaded and then apply adjustments
    const checkTawkAPI = () => {
      if (window.Tawk_API && window.Tawk_API.onLoad) {
        adjustChatBox();
        hideWeAreHereText();
        handleWidgetState();
      } else {
        setTimeout(checkTawkAPI, 500); // Retry if Tawk_API is not loaded
      }
    };

    loadTawkScript();
    checkTawkAPI();
    window.addEventListener("resize", adjustChatBox); // Adjust on resize

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", adjustChatBox);
  }, []);

  return (
    <div className="fixed bottom-10 right-10 z-50">
      <div className="tawk-button" />
      <div className="tawk-chat-box" />
    </div>
  );
};

export default TawkChat;
