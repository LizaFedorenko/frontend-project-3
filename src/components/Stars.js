import React, {useState} from "react";
import "../style.css";
const stars_d = [
  { 
    id: 1, 
    name: "Sun", 
    link: "/assets/stars/sun_im.png", 
    description: "The Sun is the star at the center of the Solar System. It is a massive, nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core, radiating the energy from its surface mainly as visible light and infrared radiation with 10% at ultraviolet energies." 
  },
  { 
    id: 2, 
    name: "Proxima Centauri", 
    link: "/assets/stars/ac.png", 
    description: "Proxima Centauri is the nearest star to Earth after the Sun, located 4.25 light-years away in the southern constellation of Centaurus. This object was discovered in 1915 by Robert Innes." 
  },
  { 
    id: 3, 
    name: "Barnard's Star", 
    link: "/assets/stars/b.png", 
    description: "Barnard's Star is a small red dwarf star in the constellation of Ophiuchus. At a distance of 5.96 light-years (1.83 pc) from Earth, it is the fourth-nearest-known individual star to the Sun after the three components of the Alpha Centauri system, and is the closest star in the northern celestial hemisphere." 
  },
  {
    id: 4, 
    name: "Luhman 16 ", 
    link: "/assets/stars/luhman 16.png", 
    description: "Luhman 16 (also designated WISE 1049−5319 or WISE J104915.57−531906.1) is a binary brown-dwarf system in the southern constellation Vela at a distance of 6.51 light-years (2.00 parsecs) from the Sun. These are the closest-known brown dwarfs and the closest system found since the measurement of the proper motion of Barnard's Star in 1916, and the third-closest-known system to the Sun (after the Alpha Centauri system and Barnard's Star). " 
  },
  {
    id: 5, 
    name: "WISE 0855−0714", 
    link: "/assets/stars/wise.png", 
    description: "WISE 0855−0714 (full designation WISE J085510.83−071442.5, or W0855 for short) is a sub-brown dwarf of spectral class Y4, located 7.4 light-years (2.3 parsecs) from the Sun in the constellation Hydra. It is the fourth-closest star or (sub-) brown dwarf system to the Sun and was discovered by Kevin Luhman in 2013 using data from the Wide-field Infrared Survey Explorer (WISE)." 
  },
  {
    id: 6, 
    name: "Wolf 359", 
    link: "/assets/stars/wolf.png", 
    description: "Wolf 359 is a red dwarf star located in the constellation Leo, near the ecliptic. At a distance of 7.86 light-years (2.41 parsecs) from Earth." 
  },
  {
    id: 7, 
    name: "Lalande 21185", 
    link: "/assets/stars/if_no_picture.png", 
    description: "Lalande 21185 (also known as BD+36 2147, Gliese 411, and HD 95735[3]) is a star in the south of Ursa Major. " 
  },
  {
    id: 8, 
    name: "Sirius (A and B)", 
    link: "/assets/stars/sirius.png", 
    description: "Sirius is the brightest star in the night sky. Its name is derived from the Greek word Σείριος (Latin script: Seirios), meaning lit. 'glowing' or 'scorching'. The star is designated α Canis Majoris, Latinized to Alpha Canis Majoris, and abbreviated α CMa or Alpha CMa." 
  },
  {
    id: 9, 
    name: "Gliese 65", 
    link: "/assets/stars/gliese.png", 
    description: "Gliese 65, also known as Luyten 726-8, is a binary star system that is one of Earth's nearest neighbors, at 8.8 light-years (2.7 parsecs) from Earth in the constellation Cetus." 
  },
  {
    id: 10, 
    name: "Ross 154 (V1216 Sgr)", 
    link: "/assets/stars/ross.png", 
    description: "Ross 154 (V1216 Sgr) is a star in the southern zodiac constellation of Sagittarius.." 
  }
];

const Stars = () => {
  const [current, set_curr] = useState(1);
  const max = 4;
  const [search_term, set_search_term] = useState("");

  const filtered_Stars = stars_d
    .filter((star) =>
      star.name.toLowerCase().includes(search_term.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const last = current * max;
  const first = last - max;

  const current_stars = filtered_Stars.slice(first, last);

  const change = (page) => {
    if (page !== current) {
      set_curr(page);
    }
  };

  const total = Math.ceil(filtered_Stars.length / max);

  console.log("current:", current);
  console.log("first:", first);
  console.log("last:", last);
  console.log("current_stars:", current_stars);

  return (
    <div className="stars-box">
      <div className = "stars-container">
        <h1>Nearest stars</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search_term}
          onChange={(e) => {
            set_search_term(e.target.value);
            set_curr(1);
          }}
          className="search-input"
        />
      </div>
      <div className="stars-grid">
        {current_stars.map((star, index) => (
          <div key={star.id || index} className="star-card">
            <img src={star.link} alt={star.name} class = 'star-img'/>
            <div className="star-info">
              <h2>{star.name}</h2>
              <p>{star.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({length: total}, (_, index) => (
          <button
            key={index + 1}
            onClick={() => change(index + 1)}
            className={`page-button ${current === index + 1 ? "active" : ""}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Stars;