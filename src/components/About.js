import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style.css";

const About = () => {
  const [icon_url, setIconUrl] = useState(null);
  const [temperature, setTemperature] = useState(null);
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = "f9b467fbb643eddf72a940668a128cf3";
        const city = "Kyiv";
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=50.45&lon=30.52&appid=${apiKey}&units=metric`;
        const response = await axios.get(url);
        const icon_code = response.data.weather[0].icon;
        setTemperature(response.data.main.temp);
        const icon_link = `https://openweathermap.org/img/wn/${icon_code}@2x.png`;
        setIconUrl(icon_link);
      } catch (error) {
        console.error("Помилка отримання погоди:", error);
      }
    };
    fetchWeather();
  }, []);

  return (
    <div className="stars-box">
      <h2>Project for Front-end course</h2>
      <p>Yelyzaveta Fedorenko, KM-22, FAM, KPI</p>
      <div className="weather_icon">
        {icon_url && (
          <img src={icon_url} alt="Weather icon" width={64} height={64} />
        )}
        {temperature !== null && <p>{Math.round(temperature)} °C</p>}
      </div>
    </div>
  );
};

export default About;

