import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/voiture_dispo.css";
import "font-awesome/css/font-awesome.min.css";

function Voiture_dispo({ setShowPayment, setReservationData }) {
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const prixUnitaire = 20000;
  const prixTotal = selectedPlaces.length * prixUnitaire;
  const [occupiedPlaces] = useState(["3", "5", "8", "11", "14"]);

  const handleValidation = () => {
    if (prixTotal > 0) {
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

    setSelectedPlaces((prev) =>
      prev.includes(placeNumber)
        ? prev.filter((p) => p !== placeNumber)
        : [...prev, placeNumber]
    );
  };

  const getPlaceClass = (placeNumber) => {
    if (selectedPlaces.includes(placeNumber)) return "selected";
    if (occupiedPlaces.includes(placeNumber)) return "occupied";
    return "";
  };

  return (
    <div className="voiture_dispo">
      {/* <div className="place" onClick={handlePlaceClick}>
        <div className="range">
          <div className="place_d" id="chauffeur">
            <i className="fa fa-user"></i>
          </div>
          <div className="place_d" id="non"></div>
          <div
            className={`place_d ${
              selectedPlaces.includes("1") ? "selected" : ""
            }`}
          >
            1
          </div>
          <div
            className={`place_d ${
              selectedPlaces.includes("2") ? "selected" : ""
            }`}
          >
            2
          </div>
        </div>
        <div className="range">
          <div
            className={`place_d ${
              selectedPlaces.includes("3") ? "selected" : ""
            }`}
          >
            3
          </div>
          <div
            className={`place_d ${
              selectedPlaces.includes("4") ? "selected" : ""
            }`}
          >
            4
          </div>
          <div
            className={`place_d ${
              selectedPlaces.includes("5") ? "selected" : ""
            }`}
          >
            5
          </div>
          <div
            className={`place_d ${
              selectedPlaces.includes("6") ? "selected" : ""
            }`}
          >
            6
          </div>
        </div>
        <div className="range">
          <div
            className={`place_d ${
              selectedPlaces.includes("7") ? "selected" : ""
            }`}
          >
            7
          </div>
          <div
            className={`place_d ${
              selectedPlaces.includes("8") ? "selected" : ""
            }`}
          >
            8
          </div>
          <div className="place_d" id="non"></div>
          <div
            className={`place_d ${
              selectedPlaces.includes("9") ? "selected" : ""
            }`}
          >
            9
          </div>
        </div>
        <div className="range">
          <div
            className={`place_d ${
              selectedPlaces.includes("10") ? "selected" : ""
            }`}
          >
            10
          </div>
          <div
            className={`place_d ${
              selectedPlaces.includes("11") ? "selected" : ""
            }`}
          >
            11
          </div>
          <div className="place_d" id="non"></div>
          <div
            className={`place_d ${
              selectedPlaces.includes("12") ? "selected" : ""
            }`}
          >
            12
          </div>
        </div>
        <div className="range">
          <div
            className={`place_d ${
              selectedPlaces.includes("13") ? "selected" : ""
            }`}
          >
            13
          </div>
          <div
            className={`place_d ${
              selectedPlaces.includes("14") ? "selected" : ""
            }`}
          >
            14
          </div>
          <div
            className={`place_d ${
              selectedPlaces.includes("15") ? "selected" : ""
            }`}
          >
            15
          </div>
          <div
            className={`place_d ${
              selectedPlaces.includes("16") ? "selected" : ""
            }`}
          >
            16
          </div>
        </div>
      </div> */}
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
          <h3>Antananarivo</h3>
          <i class="fa fa-arrow-right"></i>
          <h3>Fianarantsoa</h3>
        </div>
        <div id="donn" className="donn1">
          <p>Départ :&nbsp;</p> <span>19:00</span>
        </div>
        <div id="donn" className="donn2">
          <p>Prix :&nbsp;</p> <span>{prixUnitaire.toLocaleString()}&nbsp;</span>
          <span>Ar</span>
        </div>
        <div id="donn" className="donn3">
          <p>Place libre :&nbsp;</p> <span>12</span>
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
