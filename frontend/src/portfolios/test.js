import React, { useState, useEffect } from "react";

const ZoomContainer = () => {
  const [zoom, setZoom] = useState(1);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const maxY = document.body.scrollHeight - window.innerHeight;

    setZoom(maxY / scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ zoom: zoom }}>
      <h1>This is a container</h1>
    </div>
  );
};

export default ZoomContainer;
