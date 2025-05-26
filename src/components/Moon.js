import { useEffect, useState } from "react";
import axios from "axios";
import "../style.css";
import moon_inf from "../data/moon.json";

const MoonPhase = () => {
  const [moon_d, set_moon_d] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/moonphase?startdate=${date}`)
      .then((response) => {
        if (response.data) {
          console.log("Moon phase data:", response.data);
          set_moon_d(response.data[0]); 
          
        } else {
          console.log("No data received");
        }
      })
      .catch((error) => {
        console.error("Error fetching moon phase:", error.response?.data || error.message);
      });
  }, [date]);
  
  useEffect(() => {
    if (moon_d) {
      console.log("Moon Data Updated:", moon_d);
      console.log("Illumination:", moon_d.illumination);
    }
  }, [moon_d]);
  
  return (
    <div>
      <div className="moon">
        <h2>Choose a date:</h2>
        <div className = "phases">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <h1>Moon Phase for {date}</h1>
          {moon_d ? (
          <div>
            <p><strong>Phase:</strong> {moon_d.phase}</p>
            <p><strong>Illumination:</strong> {moon_d.illumination}</p>
            <p><strong>Moon Age:</strong> {moon_d.moon_age}</p>
            <p><strong>Moon Sign:</strong> {moon_d.moon_sign}</p>
            <p><strong>Moon Zodiac:</strong> {moon_d.moon_zodiac}</p>
            <p><strong>Moon Distance:</strong> {moon_d.moon_distance}</p>
            <p><strong>Sun Distance:</strong> {moon_d.sun_distance}</p>
            <img src={moon_d.moon_image} alt="Moon Phase" />
          </div>
          ) : (
            <p>Loading...</p>
        )}
          </div>
        </div>
        <div className="moon-additional-info">
          <p className="main-text">Moon landing</p>
          <p className="moon-additional-text">A Moon landing or lunar landing is the arrival of a spacecraft on the surface of the Moon, including both crewed and robotic missions.</p>
          {console.log("Rendering moon_inform:", moon_inf)}
          {moon_inf.map((item, index) => (
            <div key={index} className="moon-info-section">
              <div className="moon-info-text">
                <h2>{item.title}</h2>
                <p>{item.content}</p>
              </div>
              {item.image && (
                <img src={item.image} alt={item.title} className="moon-info-image" />
              )}
            </div>
          ))}
        </div>
        <div className="video-container">
        <iframe width="1060" height="815" src="https://www.youtube.com/embed/XL_SrBMBRCc?si=yqF1HcTzfXj56v4chl=uk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>
  );
};

export default MoonPhase;
