import React, {useState} from "react";
import "../style.css";
import stars_d from "../data/stars.json";

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