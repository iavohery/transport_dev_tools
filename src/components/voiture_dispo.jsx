import { useState, useEffect } from "react";
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
  data,
  onSelectionChange,
}) {
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [selectedPlacesData, setSelectedPlacesData] = useState([]);
  const prixTotal = selectedPlacesData.reduce(
    (sum, place) => sum + place.prixUnitaire,
    0
  );
  const placeLibre = totalPlaces - occupiedPlaces.length;

  const handlePlaceClick = (e) => {
    const placeDiv = e.target.closest(".place_d");
    if (!placeDiv || placeDiv.id === "non" || placeDiv.id === "chauffeur")
      return;

    const placeNumber = placeDiv.textContent.trim();
    if (!placeNumber || occupiedPlaces.includes(placeNumber)) return;

    if (!data || !data.Places) {
      console.error("Données de la voiture non disponibles");
      return;
    }

    const placeObj = data.Places.find(
      (p) => String(p.numplace).trim() === placeNumber
    );

    if (!placeObj) {
      console.warn(`Place ${placeNumber} non trouvée`);
      return;
    }

    setSelectedPlacesData((prev) => {
      // Vérifie si la même place est déjà réservée pour la MÊME date et heure
      const existingReservationIndex = prev.findIndex(
        (item) =>
          item.numeroPlace === placeNumber &&
          item.date === trajet.date &&
          item.heureDepart === trajet.heureDepart
      );

      const newReservation = {
        numeroPlace: placeNumber,
        idPlace: placeObj.idplace,
        idVoiture: data.idvoiture,
        matricule: data.numero_matricule,
        date: trajet.date,
        heureDepart: trajet.heureDepart,
        prixUnitaire: trajet.prixUnitaire,
        pointDepart: trajet.depart,
        pointAriver: trajet.arrivee,
      };

      let newSelections;

      if (existingReservationIndex >= 0) {
        // Supprime seulement la réservation pour ce créneau exact
        newSelections = prev.filter(
          (_, index) => index !== existingReservationIndex
        );
        console.log("Réservation annulée pour", {
          date: trajet.date,
          heure: trajet.heureDepart,
          place: placeNumber,
        });
      } else if (prev.length >= maxPlaces) {
        console.warn("Limite maximale de places atteinte", {
          limit: maxPlaces,
          attemptedReservation: newReservation,
        });
        return prev;
      } else {
        // Ajoute la nouvelle réservation
        newSelections = [...prev, newReservation];
        console.log("Nouvelle réservation ajoutée", {
          reservation: newReservation,
          totalReservations: newSelections.length,
          reservationsParHeure: groupByHour(newSelections),
        });
      }

      if (onSelectionChange) onSelectionChange(newSelections);
      return newSelections;
    });

    // Mise à jour visuelle
    setSelectedPlaces((prev) => {
      if (prev.includes(placeNumber)) {
        // On désélectionne
        return prev.filter((p) => p !== placeNumber);
      } else {
        // On ajoute si on n’a pas dépassé la limite
        if (prev.length >= maxPlaces) return prev;
        return [...prev, placeNumber];
      }
    });
  };

  // Helper function
  const groupByHour = (reservations) => {
    return reservations.reduce((acc, curr) => {
      const key = `${curr.date} ${curr.heureDepart}`;
      (acc[key] = acc[key] || []).push(curr.numeroPlace);
      return acc;
    }, {});
  };

  const handleValidation = () => {
    if (selectedPlacesData.length > 0) {
      const reservationComplete = {
        trajet: {
          depart: trajet.depart,
          arrivee: trajet.arrivee,
          heureDepart: trajet.heureDepart,
          prixUnitaire: trajet.prixUnitaire,
        },
        selection: selectedPlacesData,
        prixTotal: prixTotal,
        restrictions: {
          maxPlaces: maxPlaces,
        },
      };

      console.log("DONNÉES COMPLÈTES PAIEMENT:", reservationComplete);

      setReservationData({
        placesCount: selectedPlacesData.length,
        totalPrice: prixTotal,
        details: selectedPlacesData,
      });

      setShowPayment(true);
    }
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
          <i className="fa fa-arrow-right"></i>
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
          }}
          title={
            prixTotal === 0 ? "Veuillez sélectionner au moins une place" : ""
          }
        >
          <p>Valider</p>
          <i className="fa fa-shopping-cart"></i>
        </button>
      </div>
    </div>
  );
}

export default Voiture_dispo;
