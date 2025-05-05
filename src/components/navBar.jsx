import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/navbar.css";
import translogo from "../assets/translogo.png";
import Aide from "./aide";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [param, setParam] = useState(false);
  const [showAide, setShowAide] = useState(false);
  const paramRef = useRef(null);
  const gearButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        paramRef.current &&
        !paramRef.current.contains(event.target) &&
        gearButtonRef.current &&
        !gearButtonRef.current.contains(event.target)
      ) {
        setParam(false);
      }
    };

    if (param) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [param]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const toggleParam = () => {
    setParam(!param);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const getLinkClass = (path) => {
    return location.pathname === path ? "active" : "";
  };
  return (
    <nav className={`navbar3 ${scrolled ? "scrolled" : ""}`}>
      {showAide && <Aide setShowAide={setShowAide} />}
      <div className="navbar__logo3">
        <img src={translogo} alt="" />
      </div>
      <div className={`navbar__links3 ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li className={getLinkClass("/")}>
            <Link to="/">Acceuil</Link>
            <div id="rond3"></div>
          </li>
          <li className={getLinkClass("/Reserver")}>
            <Link to="/Reserver">Reserver</Link>
            <div id="rond3"></div>
          </li>
          <li className={getLinkClass("/Destination")}>
            <Link to="/Destination">Destination</Link>
            <div id="rond3"></div>
          </li>
          <li id="menu-gear">
            <button id="gear" onClick={toggleParam} ref={gearButtonRef}>
              <i className="fa fa-gear"></i>
              <span>Paramètre</span>
            </button>
            <button id="help" onClick={() => setShowAide(true)}>
              <i className="fa fa-question-circle"></i>
              <span>Aide</span>
            </button>
          </li>
        </ul>
        <div className={param ? "bas-gear active" : "bas-gear"} ref={paramRef}>
          <div className="bas-gear-1">
            <label>Langue :</label>
            <select name="" id="langue">
              <option value="Francais">Francais</option>
              <option value="Anglais">Anglais</option>
            </select>
          </div>
          <div className="bas-gear-1">
            <label>Mode :</label>
            <button
              id="mode"
              className={darkMode ? "active" : ""}
              onClick={toggleDarkMode}
              aria-label={
                darkMode
                  ? "Désactiver le mode sombre"
                  : "Activer le mode sombre"
              }
            ></button>
          </div>
          <div className="bas-gear-1">
            <button id="déco2">
              <i class="fa fa-sign-in"></i>
              <span>Se connecter</span>
            </button>
          </div>
          <div className="bas-gear-1">
            <button id="déco2">
              <i class="fa fa-sign-out"></i>
              <span>Se déconnecter</span>
            </button>
          </div>
        </div>
      </div>
      {/* 
      <div className="navbar__toggle" onClick={toggleMenu}>
        <span>{isMenuOpen ? "Close" : "Menu"}</span>
      </div> */}
    </nav>
  );
}

export default NavBar;
