import React, { useEffect, useState } from "react";
import "../style.css";

const ScrollProgressBar = () => {
    const [scroll_pr, set_scroll_pr] = useState(0);

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const winHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / winHeight) * 100;
      set_scroll_pr(scrolled);
    };
  
    useEffect(() => {
      window.addEventListener("scroll", updateProgress);
      return () => window.removeEventListener("scroll", updateProgress);
    }, []);
  
    return (
      <div className="rocket-container">
        <img
          src={'/assets/rocket.png'}
          alt="Rocket"
          className="rocket-icon"
          style={{ top: `${scroll_pr}%` }}
        />
      </div>
    );
};

export default ScrollProgressBar;
