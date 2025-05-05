import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/navbaradmin.css";
import "font-awesome/css/font-awesome.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import translogo from "../assets/translogo.png";

function NavBarAdmin({ setShowDeco }) {
  return (
    <nav className="navbar">
      <div className="navbar_droite">
        <p>
          Utilisateur : <span>Belou</span>
        </p>
        <button id="déco" onClick={() => setShowDeco(true)}>
          <i class="fa fa-sign-out"></i>
          <span>Déconnecter</span>
        </button>
      </div>
      <div className="navbar__logo">
        <img src={translogo} alt="" />
      </div>
      <div className="navbar__links5">
        <ul>
          <li>
            <Link className="link" to="/Recette">
              <i className="fa fa-money-bill-wave"></i>
              Recette
            </Link>
          </li>
          <li>
            <Link className="link" to="/Reservation">
              <i className="fa fa-calendar"></i>
              Reservation
            </Link>
          </li>
          <li>
            <Link className="link" to="/Utilisateur">
              <i className="fa fa-user"></i>
              Utilisateur
            </Link>
          </li>
          <li>
            <Link className="link" to="/Chauffeur">
              <i className="fa fa-id-badge"></i>
              Chauffeur
            </Link>
          </li>
          <li>
            <Link className="link" to="/Voitures">
              <i className="fa fa-car"></i>
              Voitures
            </Link>
          </li>
          <li>
            <Link className="link" to="/Employe">
              <i className="fa fa-briefcase"></i>
              Employe
            </Link>
          </li>
          <li>
            <Link className="link" to="/Trajet">
              <i className="fa fa-location-arrow"></i>
              Trajet
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBarAdmin;
