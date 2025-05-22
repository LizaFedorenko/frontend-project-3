import React, {useEffect, useState}  from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Main from "./components/Main";
import Planets from "./components/Planets";
import Stars from "./components/Stars";
import Moon from "./components/Moon";
import Register from "./components/Register";
import About from "./components/About";
import PlanetPage from "./pages/PlanetPage";
import Forum from './components/Forum'
import ScrollProgressBar from "./components/ScrollProgressBar";
import TopicPage from "./components/TopicPage";
import "./style.css";
//npm start

function App() {
  const [is_large_font, set_is_large] = useState(false);

  const toggle_font_size = () => {
    set_is_large(!is_large_font);
  };

  useEffect(() => {
    const saved_font_size = localStorage.getItem('fontSize');
    if (saved_font_size) {
      set_is_large(saved_font_size === 'large');
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
  
    if (is_large_font) {
      root.classList.add('large-font');
      localStorage.setItem('fontSize', 'large');
    } else {
      root.classList.remove('large-font');
      localStorage.setItem('fontSize', 'normal');
    }
  }, [is_large_font]);
  return (
    <Router>
      <div className="cosmos-back"></div>
      <div className="app-container">
        <ScrollProgressBar />
        <header>
          <h1>Solar System Project</h1>
          <nav className="nav-links">
            <Link to="/">Main</Link>
            <Link to="/planets">Planets</Link>
            <Link to="/stars">Stars</Link>
            <Link to="/moon">Moon</Link>
            <Link to="/register">Forum</Link>
            <Link to="/about">About</Link>
            <button className="contrast-toggle" onClick={toggle_font_size}>
              {is_large_font ? '🔍 Smaller Text' : '🔎 Larger Text'}
            </button>
          </nav>
        </header>

        <div className="page-container">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/planets" element={<Planets />} />
            <Route path="/planets/:planet_name" element={<PlanetPage />} />
            <Route path="/stars" element={<Stars />} />
            <Route path="/moon" element={<Moon />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/forum/topic/:id" element={<TopicPage />} />
          </Routes>
        </div>

        <div class = "bottom">
          <p>All rights reserved (C)</p>
        </div>
      </div>
    </Router>
  );
}

export default App;
