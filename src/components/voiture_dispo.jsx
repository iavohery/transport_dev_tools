import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/voiture_dispo.css";
import "font-awesome/css/font-awesome.min.css";

function Voiture_dispo({
  setShowPayment,
  setReservationData,
  maxPlaces,
  occupiedPlaces = [],
  trajet,
  totalPlaces,
}) {
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const prixTotal = selectedPlaces.length * trajet.prixUnitaire;
  const placeLibre = totalPlaces - occupiedPlaces.length;

  const handleValidation = () => {
    if (prixTotal > 0) {
      const reservationComplete = {
        trajet: {
          depart: trajet.depart,
          arrivee: trajet.arrivee,
          heureDepart: trajet.heureDepart,
          prixUnitaire: trajet.prixUnitaire,
        },
        places: {
          selectionnees: selectedPlaces,
          occupees: occupiedPlaces,
          libres: placeLibre,
          total: totalPlaces,
        },
        prix: {
          unitaire: trajet.prixUnitaire,
          total: prixTotal,
        },
        restrictions: {
          maxPlaces: maxPlaces,
        },
      };

      console.log("DONNÉES DE RÉSERVATION:", reservationComplete);

      
      setReservationData({
        placesCount: selectedPlaces.length,
        totalPrice: prixTotal,
      });
      setShowPayment(true);
    }
  };

  const handlePlaceClick = (e) => {
    const placeDiv = e.target.closest(".place_d");
    if (!placeDiv || placeDiv.id === "non" || placeDiv.id === "chauffeur")
      return;

    const placeNumber = placeDiv.textContent;
    if (!placeNumber || occupiedPlaces.includes(placeNumber)) return;

    setSelectedPlaces((prev) => {
      if (prev.includes(placeNumber)) {
        return prev.filter((p) => p !== placeNumber);
      } else if (prev.length < maxPlaces) {
        return [...prev, placeNumber];
      }
      return prev;
    });
  };

  const getPlaceClass = (placeNumber) => {
    if (selectedPlaces.includes(placeNumber)) return "selected";
    if (occupiedPlaces.includes(placeNumber)) return "occupied";
    return "";
  };

  return (
    <div className="voiture_dispo">
      <div className="place" onClick={handlePlaceClick}>
        {/* Range 1 */}
        <div className="range">
          <div className="place_d" id="chauffeur">
            <i className="fa fa-user"></i>
          </div>
          <div className="place_d" id="non"></div>
          <div className={`place_d ${getPlaceClass("1")}`}>1</div>
          <div className={`place_d ${getPlaceClass("2")}`}>2</div>
        </div>

        {/* Range 2 */}
        <div className="range">
          <div className={`place_d ${getPlaceClass("3")}`}>3</div>
          <div className={`place_d ${getPlaceClass("4")}`}>4</div>
          <div className={`place_d ${getPlaceClass("5")}`}>5</div>
          <div className={`place_d ${getPlaceClass("6")}`}>6</div>
        </div>

        {/* Range 3 */}
        <div className="range">
          <div className={`place_d ${getPlaceClass("7")}`}>7</div>
          <div className={`place_d ${getPlaceClass("8")}`}>8</div>
          <div className="place_d" id="non"></div>
          <div className={`place_d ${getPlaceClass("9")}`}>9</div>
        </div>

        {/* Range 4 */}
        <div className="range">
          <div className={`place_d ${getPlaceClass("10")}`}>10</div>
          <div className={`place_d ${getPlaceClass("11")}`}>11</div>
          <div className="place_d" id="non"></div>
          <div className={`place_d ${getPlaceClass("12")}`}>12</div>
        </div>

        {/* Range 5 */}
        <div className="range">
          <div className={`place_d ${getPlaceClass("13")}`}>13</div>
          <div className={`place_d ${getPlaceClass("14")}`}>14</div>
          <div className={`place_d ${getPlaceClass("15")}`}>15</div>
          <div className={`place_d ${getPlaceClass("16")}`}>16</div>
        </div>
      </div>
      <div className="trajet">
        <div className="traj_1">
          <h3>{trajet.depart}</h3>
          <i class="fa fa-arrow-right"></i>
          <h3>{trajet.arrivee}</h3>
        </div>
        <div id="donn" className="donn1">
          <p>Départ :&nbsp;</p> <span>{trajet.heureDepart}</span>
        </div>
        <div id="donn" className="donn2">
          <p>Prix :&nbsp;</p> <span>{trajet.prixUnitaire}&nbsp;</span>
          <span>Ar</span>
        </div>
        <div id="donn" className="donn3">
          <p>Place libre :&nbsp;</p> <span>{placeLibre}</span>
        </div>
        <div id="donn" className="donn4">
          <p>A payer :&nbsp;</p> <span>{prixTotal.toLocaleString()}&nbsp;</span>
          <span>Ar</span>
        </div>
      </div>
      <div className="validation">
        <button
          id="valider_voiture"
          onClick={handleValidation}
          style={{
            opacity: prixTotal === 0 ? 0.3 : 1,
            cursor: prixTotal === 0 ? "not-allowed" : "pointer",
            backgroundColor: prixTotal === 0 ? "transparent" : "",
            color: prixTotal === 0 ? "white" : "",
            border: prixTotal === 0 ? "1px solid white" : "",
          }}
          title={
            prixTotal === 0 ? "Veuillez sélectionner au moins une place" : ""
          }
        >
          <p
            style={{
              opacity: prixTotal === 0 ? 0.6 : 1,
              cursor: prixTotal === 0 ? "not-allowed" : "pointer",
              backgroundColor: prixTotal === 0 ? "transparent" : "",
              color: prixTotal === 0 ? "white" : "",
            }}
          >
            Valider
          </p>
          <i className="fa fa-shopping-cart"></i>
        </button>
      </div>
    </div>
  );
}

export default Voiture_dispo;
