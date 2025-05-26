import React from "react";
import "../style.css";
import {useEffect, useState} from "react";
import uni_inf from "../data/main.json";
import {useRef} from "react";

const Main = () => {
  const text = "Welcome!";
  const type_sp = 200;
  const [displayed_t, set_displayed_t] = useState("");
  const [index, set_index] = useState(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {threshold: 0.2}
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        set_displayed_t((prev) => prev + text[index]);
        set_index(index + 1);
      }, type_sp);

      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <div className="main-container">
      <div className="welcome-section">
        <h1 className="welcome-text">{displayed_t}</h1>
      </div>
      <div className="additional-info">
        <p className="main-text">Chronology of the Universe</p>

        {uni_inf.map((item, index) => (
          <div
            key={index}
            className={`info-section ${index % 2 !== 0 ? "reverse" : ""}`}
            ref={(el) => (sectionRefs.current[index] = el)}
          >
            <div className="info-text">
              <h2>{item.title}</h2>
              <p>{item.content}</p>
            </div>
            {item.image && (
              <img src={item.image} alt={item.title} className="info-image" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;