import { useEffect, useState } from "react";
import "../css/reserverComp.css";
import { Link, useLocation } from "react-router-dom";
import fontLog from "../assets/fontLog.jpg";
import Voiture_dispo from "./voiture_dispo";
import { GetPlaceOccuper } from "../assets/servicRoute/placeOccuper.service";

function ReserverComp({
  setShowPayment,
  setReservationData,
  setGlobalSelections,
  setRefreshFn,
}) {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [timeOfDay, setTimeOfDay] = useState();
  const [prixTotal, setPrixTotal] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const [voituresDisponibles, setVoituresDisponibles] = useState([]);
  const [globalSelections, setGlobalSelection] = useState([]);

  const fetchVoituresDisponibles = async () => {
    try {
      const response = await GetPlaceOccuper({
        point_depart: departure,
        destination: arrival,
        date: reservationDate,
        heure_depart: timeOfDay,
      });
      const result = response.data.data;

      const filtres = result.filter((voiture) => {
        return voiture.Voyages.some((v) => {
          return (
            v.date === reservationDate &&
            v.heure_depart === timeOfDay &&
            v.Trajet.point_depart.toLowerCase() === departure.toLowerCase() &&
            v.Trajet.destination.toLowerCase() === arrival.toLowerCase()
          );
        });
      });

      setVoituresDisponibles(filtres);
    } catch (error) {
      console.error("Erreur lors de la récupération des voitures:", error);
      setVoituresDisponibles([]);
    }
  };

  useEffect(() => {
    setRefreshFn(() => fetchVoituresDisponibles);
  }, [departure, arrival, reservationDate, timeOfDay]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    setHasSearched(true);
    fetchVoituresDisponibles();
  };

  const isFormValid = () => {
    return (
      departure !== "" &&
      arrival !== "" &&
      reservationDate !== "" &&
      travelers > 0
    );
  };

  const cities = [
    "Antananarivo",
    "Antsirabe",
    "Ambositra",
    "Fianarantsoa",
    "Antsiranana",
    "Mahajanga",
  ];

  const handleTravelerChange = (operation) => {
    if (operation === "increment" && travelers < 10) {
      setTravelers(travelers + 1);
    } else if (operation === "decrement" && travelers > 1) {
      setTravelers(travelers - 1);
    }
  };

  const handleVoitureSelection = (voitureId, newSelection) => {
    setGlobalSelection((prev) => {
      // 1. Filtrer pour garder seulement les réservations des autres voitures
      const otherReservations = prev.filter(
        (item) => item.idVoiture !== voitureId
      );

      // 2. Vérifier si cette place existe déjà pour cette voiture (même date/heure)
      const existingIndex = prev.findIndex(
        (item) =>
          item.idVoiture === voitureId &&
          item.numeroPlace === newSelection.numeroPlace &&
          item.voyageDate === newSelection.voyageDate &&
          item.heureDepart === newSelection.heureDepart
      );

      // 3. Gérer l'ajout/suppression
      if (existingIndex >= 0) {
        // Supprimer seulement cette réservation spécifique
        return [
          ...prev.slice(0, existingIndex),
          ...prev.slice(existingIndex + 1),
        ];
      } else {
        // Ajouter la nouvelle réservation
        return [...otherReservations, newSelection];
      }
    });
    setGlobalSelections(newSelection);
  };

  // useEffect(() => {
  //   console.log("ty le globale ty", globalSelections);
  //   setGlobalSelections(globalSelections);
  // }, [globalSelections]);

  return (
    <div className="centrereserver">
      <div className="centrereserver_1">
        <h2>Choisissez votre itinéraire</h2>
        <form>
          <div className="form-group1">
            <label htmlFor="departure">Départ:</label>
            <select
              id="departure"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
            >
              <option value="">Sélectionnez une ville</option>
              {cities.map((city) => (
                <option key={`dep-${city}`} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group1">
            <label htmlFor="arrival">Arrivée:</label>
            <select
              id="arrival"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
            >
              <option value="">Sélectionnez une ville</option>
              {cities.map((city) => (
                <option key={`arr-${city}`} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group1">
            <label htmlFor="reservationDate">Date de réservation:</label>
            <input
              type="date"
              id="reservationDate"
              value={reservationDate}
              min={new Date().toISOString().split("T")[0]}
              max={
                new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                  .toISOString()
                  .split("T")[0]
              }
              onChange={(e) => setReservationDate(e.target.value)}
            />
          </div>

          <div className="form-group1">
            <label>Nombre de voyageurs:</label>
            <div className="travelers-control">
              <button
                type="button"
                className="travelers-btn"
                onClick={() => handleTravelerChange("decrement")}
              >
                -
              </button>
              <span className="travelers-count">{travelers}</span>
              <button
                type="button"
                className="travelers-btn"
                onClick={() => handleTravelerChange("increment")}
              >
                +
              </button>
            </div>
          </div>

          <div className="form-group1">
            <label>Heure de départ:</label>
            <div className="time-options">
              {["07:00", "12:00", "19:00"].map((time) => (
                <label key={time}>
                  <input
                    type="radio"
                    name="timeOfDay"
                    value={time}
                    checked={timeOfDay === time}
                    onChange={() => setTimeOfDay(time)}
                  />
                  {time === "07:00"
                    ? "Matin (07h)"
                    : time === "12:00"
                    ? "Midi (12h)"
                    : "Soir (19h)"}
                </label>
              ))}
            </div>
          </div>

          <button
            type="button"
            className={`submit-btn ${!isFormValid() ? "disabled" : ""}`}
            onClick={handleSubmit}
            disabled={!isFormValid()}
          >
            <span>Recherche </span>
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>

      <div className="centrereserver_2">
        <div className="cover">
          <div className="cov1">
            <div className="cube"></div>
            <p>Place Libre</p>
          </div>
          <div className="cov2">
            <div className="cube"></div>
            <p>Place occupée</p>
          </div>
          <div className="cov3">
            <div className="cube"></div>
            <p>Vos places</p>
          </div>
          <div className="cov4">
            <div className="cube">
              <i className="fa fa-user"></i>
            </div>
            <p>Chauffeur</p>
          </div>
        </div>

        {!hasSearched && (
          <div className="pre-search-message">
            <div className="search-icon-container">
              <i className="fa fa-search fa-3x"></i>
            </div>
            <h3>Recherchez votre trajet idéal</h3>
            <p>
              Veuillez sélectionner vos critères de voyage (ville de départ,
              destination, date, nombre de voyageurs et heure) puis cliquez sur
              "Rechercher"
            </p>
            <div className="tips">
              <p>
                <i className="fa fa-lightbulb"></i> Conseil : Essayez d'élargir
                vos dates pour plus d'options
              </p>
            </div>
          </div>
        )}

        {hasSearched && voituresDisponibles.length === 0 && (
          <div className="no-results-message">
            <i className="fa fa-exclamation-circle"></i>
            <p>Aucun trajet trouvé pour vos critères</p>
          </div>
        )}

        {hasSearched &&
          voituresDisponibles.map((voiture) => {
            const matchedVoyage = voiture.Voyages.find(
              (v) =>
                v.date === reservationDate &&
                v.heure_depart === timeOfDay &&
                v.Trajet.point_depart.toLowerCase() ===
                  departure.toLowerCase() &&
                v.Trajet.destination.toLowerCase() === arrival.toLowerCase()
            );

            if (!matchedVoyage) return null;

            return (
              <Voiture_dispo
                key={voiture.idvoiture}
                setShowPayment={setShowPayment}
                setReservationData={setReservationData}
                maxPlaces={travelers}
                occupiedPlaces={voiture.Places.filter(
                  (p) => Array.isArray(p.Reservers) && p.Reservers.length > 0
                ).map((p) => String(p.numplace))}
                totalPlaces={voiture.capacite}
                trajet={{
                  depart: matchedVoyage.Trajet.point_depart,
                  arrivee: matchedVoyage.Trajet.destination,
                  heureDepart: matchedVoyage.heure_depart,
                  prixUnitaire: matchedVoyage.Trajet.tarif,
                  date: matchedVoyage.date,
                }}
                data={voiture}
                currentSelections={globalSelections.filter(
                  (sel) => sel.idVoiture === voiture.idvoiture
                )}
                onSelectionChange={(selection) => {
                  handleVoitureSelection(voiture.idvoiture, {
                    ...selection,
                    idVoiture: voiture.idvoiture,
                    matricule: voiture.numero_matricule,
                    voyageDate: matchedVoyage.date,
                    heureDepart: matchedVoyage.heure_depart,
                  });
                }}
              />
            );
          })}
      </div>
    </div>
  );
}

export default ReserverComp;
