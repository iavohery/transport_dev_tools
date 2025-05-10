import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/navbaradmin.css";
import "font-awesome/css/font-awesome.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import translogo from "../assets/translogo.png";

function NavBarAdmin({ setShowDeco }) {
  const [notifOpen, setNotifOpen] = useState(false);
  // Tableau des notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      icon: "fa fa-car-side",
      title: "Alerte Maintenance",
      message: "La voiture numero 2345 TBA devrait passer une maintenance.",
    },
    {
      id: 2,
      icon: "fa fa-credit-card",
      title: "Alerte Dépense",
      message:
        "La depense de cette semaine represente une hausse par rapport à la semaine dernière.",
    },
    {
      id: 3,
      icon: "fa fa-car",
      title: "Alerte Voyage",
      message: "Le voyage du 09/05/2025 à 07:00 à été retardée de 30min.",
    },
  ]);

  const toggleNotif = () => {
    setNotifOpen(!notifOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar_droite">
        <p>
          Utilisateur : <span>Belou</span>
        </p>
        <button id="déco" onClick={() => setShowDeco(true)}>
          <i className="fa fa-sign-out"></i>
          <span>Déconnecter</span>
        </button>
      </div>
      <div className="navbar__logo">
        <img src={translogo} alt="" />
      </div>
      <div id="notif" onClick={toggleNotif}>
        <div id="notifrond"></div>
        <p>+{notifications.length} notifications</p>
      </div>
      <div className="navbar__links5">
        <ul>
          <li>
            <Link className="link" to="/Recette">
              <i className="fa fa-cash-register"></i>
              Recette
            </Link>
          </li>
          <li>
            <Link className="link" to="/Reservation">
              <i className="fa fa-calendar-check"></i>
              Reservation
            </Link>
          </li>
          <li>
            <Link className="link" to="/Utilisateur">
              <i className="fa fa-users"></i>
              Utilisateur
            </Link>
          </li>
          <li>
            <Link className="link" to="/Chauffeur">
              <i className="fa fa-id-card-alt"></i>
              Chauffeur
            </Link>
          </li>
          <li>
            <Link className="link" to="/Voitures">
              <i className="fa fa-car-side"></i>
              Voitures
            </Link>
          </li>
          <li>
            <Link className="link" to="/Employe">
              <i className="fa fa-user-tie"></i>
              Employe
            </Link>
          </li>
          <li>
            <Link className="link" to="/Poste">
              <i className="fa fa-building"></i>
              Poste
            </Link>
          </li>
          <li>
            <Link className="link" to="/Trajet">
              <i className="fa fa-route"></i>
              Trajet
            </Link>
          </li>
          <li>
            <Link className="link" to="/Voyage">
              <i className="fa fa-car-alt"></i>
              Voyage
            </Link>
          </li>
          <li>
            <Link className="link" to="/Paiement">
              <i className="fa fa-money-bill-wave"></i>
              Paiement Espèce
            </Link>
          </li>
          <li>
            <Link className="link" to="/Depense">
              <i className="fa fa-credit-card"></i>
              Depense
            </Link>
          </li>
        </ul>
        <div id={notifOpen ? "notif_texteactive" : "notif_texte"}>
          {notifications.map((notification) => (
            <div id="notif__" key={notification.id}>
              <i className={notification.icon}></i>
              <div id="texte__">
                <h3>{notification.title}</h3>
                <p>{notification.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default NavBarAdmin;