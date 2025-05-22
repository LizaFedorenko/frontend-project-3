import React from "react";
import {useParams, useNavigate} from "react-router-dom";
import "../style.css";

import mercuryImg from "../assets/Mercury.jpg";
import venusImg from "../assets/venus.jpg";
import earthImg from "../assets/earth.jpg";
import marsImg from "../assets/mars.jpg";
import jupiterImg from "../assets/jupiter.jpg";
import saturnImg from "../assets/saturn.jpg";
import uranusImg from "../assets/uranus.jpg";
import neptuneImg from "../assets/neptune.jpg";
import plutoImg from "../assets/pluto.jpg";

const planet_inf = {
    mercury: { 
      desc: "Mercury is the smallest planet.",
      more_info: "Mercury is the first planet from the Sun and the smallest in the Solar System. In English, it is named after the ancient Roman god Mercurius (Mercury), god of commerce and communication, and the messenger of the gods. Mercury is classified as a terrestrial planet, with roughly the same surface gravity as Mars.", 
      img: mercuryImg},
    venus: { 
      desc: "Venus has a thick atmosphere.", 
      more_info: "Venus is the second planet from the Sun. It is a terrestrial planet and is the closest in mass and size to its orbital neighbour Earth. Venus has by far the densest atmosphere of the terrestrial planets, composed mostly of carbon dioxide with a thick, global sulfuric acid cloud cover.",
      img: venusImg},
    earth: { 
      desc: "Earth supports life.",
      more_info: "Earth is the third planet from the Sun and the only astronomical object known to harbor life. This is enabled by Earth being an ocean world, the only one in the Solar System sustaining liquid surface water. Almost all of Earth's water is contained in its global ocean, covering 70.8% of Earth's crust. ", 
      img: earthImg},
    mars: { 
      desc: "Mars is the Red Planet.", 
      more_info: "Mars is the fourth planet from the Sun. The surface of Mars is orange-red because it is covered in iron(III) oxide dust, giving it the nickname 'the Red Planet'. Mars is among the brightest objects in Earth's sky, and its high-contrast albedo features have made it a common subject for telescope viewing.",
      img: marsImg},
    jupiter: { 
      desc: "Jupiter is the biggest planet.", 
      more_info: "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than 2.5 times that of all the other planets in the Solar System combined and slightly less than one-thousandth the mass of the Sun.",
      img: jupiterImg},
    saturn: { 
      desc: "Saturn has beautiful rings.",
      more_info: "Saturn is the sixth planet from the Sun and the second largest in the Solar System, after Jupiter. It is a gas giant, with an average radius of about nine times that of Earth. It has an eighth the average density of Earth, but is over 95 times more massive.", 
      img: saturnImg},
    uranus: { 
      desc: "Uranus rotates on its side.", 
      more_info: "Uranus is the seventh planet from the Sun. It is a gaseous cyan-coloured ice giant. Most of the planet is made of water, ammonia, and methane in a supercritical phase of matter, which astronomy calls 'ice' or volatiles. The planet's atmosphere has a complex layered cloud structure and has the lowest minimum temperature (49 K (−224 °C; −371 °F)) of all the Solar System's planets. ",
      img: uranusImg},
    neptune: { 
      desc: "Neptune is farthest from the Sun.", 
      more_info: "Neptune is the eighth and farthest known planet from the Sun. It is the fourth-largest planet in the Solar System by diameter, the third-most-massive planet, and the densest giant planet. It is 17 times the mass of Earth.",
      img: neptuneImg},
    pluto: { 
      desc: "Pluto is a dwarf planet.", 
      more_info: "Pluto is a dwarf planet located in the Kuiper Belt, a distant region of our solar system beyond Neptune. ",
      img: plutoImg},
  };
  
  const PlanetPage = () => {
    const {planet_name} = useParams();
    const navigate = useNavigate();
  
    if (!planet_name || !planet_inf[planet_name]) {
      return <h2>Error: something has gone wrong</h2>;
    }
  
    const planet = planet_inf[planet_name];
  
    return (
      <div className="planet-container">
        <div className="planet-name">{planet_name.charAt(0).toUpperCase() + planet_name.slice(1)}</div>
        <div className="planet-content">
          <img src={planet.img} alt={planet_name} className="planet-image" />
          <p className="planet-description">{planet.desc}</p>
          <p className="planet-description2">{planet.more_info}</p>
        </div>
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      </div>
    );
  };
  
  export default PlanetPage;
