import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/navBarPage.css";
import translogo from "../assets/translogo.png";

function NavBarPage() {
  return (
    <nav className="navbar2">
      <Link to="/AdminPage">
      <div className="navbar__logo2">
        <img src={translogo} alt="" />
      </div>
      </Link>
      <div className="navbar_droite2">
        <p>
          Utilisateur : <span>Belou</span>
        </p>
        <Link to="/AdminPage">
          <button id="déco" onClick={() => setShowDeco(true)}>
            <i className="fa fa-home"></i>
            <span>Acceuil</span>
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default NavBarPage;
