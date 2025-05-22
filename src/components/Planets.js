import React from "react";
import "../style.css";

const planets = [
  {name: "Mercury", coords: "385,375,40", link: "/planets/mercury"},
  {name: "Venus", coords: "410,335,40", link: "/planets/venus"},
  {name: "Earth", coords: "550,335,50", link: "/planets/earth"},
  {name: "Mars", coords: "620,335,40", link: "/planets/mars"},
  {name: "Jupiter", coords: "750,335,55", link: "/planets/jupiter"},
  {name: "Saturn", coords: "880,335,55", link: "/planets/saturn"},
  {name: "Uranus", coords: "1100,335,45", link: "/planets/uranus"},
  {name: "Neptune", coords: "1200,335,45", link: "/planets/neptune"},
  {name: "Pluto", coords: "1300,335,45", link: "/planets/pluto"},
];

const Planets = () => {
  return (
    <div className="planets-back">
      <img src="/assets/planetsfor.gif" alt="Solar System" className="planets" useMap="#solarsystem" />
      <map name="solarsystem">
        {planets.map((planet) => (
          <area
            key={planet.name}
            shape="circle"
            coords={planet.coords}
            href={planet.link}
            alt={planet.name}
          />
        ))}
      </map>
    </div>
  );
};

export default Planets;