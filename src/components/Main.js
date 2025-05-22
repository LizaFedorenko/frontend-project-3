import React from "react";
import "../style.css";
import {useEffect, useState} from "react";

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


const uni_inf = [
  {
    title: 'Big Bang',
    content: 'The universe began from a singularity approximately 13.8 billion years ago. Space, time, matter, and energy all emerged from this event.',
    image: '/assets/main/bigbang.png',
  },
  {
    title: 'Cosmic inflation',
    content: 'A fraction of a second after the Big Bang, the universe underwent rapid exponential expansion, smoothing out irregularities.',
    image: '/assets/main/inflation.png',
  },
  {
    title: 'Formation of Subatomic particles',
    content: 'As the universe cooled, protons, neutrons, and electrons formed, eventually combining into simple atoms like hydrogen and helium.',
    image: '',
  },
  {
    title: 'Formation of Galaxies',
    content: 'Gravitational forces caused matter to clump together into the first stars and galaxies, hundreds of millions of years after the Big Bang.',
    image: '/assets/main/galaxies.png',
  },
  {
    title: 'The Milky Way',
    content: 'Our galaxy, the Milky Way, began forming around 13.5 billion years ago and has grown by merging with smaller galaxies.',
    image: '/assets/main/milkyWay.png',
  },
  {
    title: 'The Solar System',
    content: 'About 4.6 billion years ago, the solar system formed from a cloud of gas and dust, leading to the birth of the Sun and planets.',
    image: '/assets/main/solar.png',
  },
  {
    title: 'Origin of Life on Earth',
    content: 'Roughly 3.5 to 4 billion years ago, simple life forms began to emerge in Earth’s oceans, eventually evolving into more complex organisms.',
    image: '',
  },
  {
    title: 'Modern Human civilization',
    content: 'Humans appeared around 300,000 years ago, with modern civilizations forming in the last 10,000 years, exploring the cosmos once again.',
    image: '/assets/main/humans.png',
  },
];

