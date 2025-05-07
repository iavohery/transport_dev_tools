import { useState } from "react";
import "../css/reserverComp.css";
import { Link, useLocation } from "react-router-dom";
import fontLog from "../assets/fontLog.jpg";
import Voiture_dispo from "./voiture_dispo";

function ReserverComp({ setShowPayment, setReservationData }) {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [timeOfDay, setTimeOfDay] = useState("morning");
  const [prixTotal, setPrixTotal] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const [voituresDisponibles, setVoituresDisponibles] = useState([]);
  const occupiedPlaces = ["3", "5", "8", "11", "14"];
  const prix = 20000;

  const handleSubmit = (e) => {
    e.preventDefault();
    // setSearchPerformed(true);

    setHasSearched(true);
    const resultats = fetchVoituresDisponibles();
    setVoituresDisponibles(resultats);

    console.log({
      departure,
      arrival,
      reservationDate,
      travelers,
      timeOfDay,
    });
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

  return (
    <div className="centrereserver">
      <div className="centrereserver_1">
        <h2>Choisissez votre itinéraire</h2>
        {/* <p id="centrereserver_1_p">(Veuillez renseigner les informations nécessaires)</p> */}
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
              ></button>
            </div>
          </div>

          <div className="form-group1">
            <label>Heure de départ:</label>
            <div className="time-options">
              <label>
                <input
                  type="radio"
                  name="timeOfDay"
                  value="07:00"
                  checked={timeOfDay === "07:00"}
                  onChange={() => setTimeOfDay("07:00")}
                />
                Matin (07h)
              </label>
              <label>
                <input
                  type="radio"
                  name="timeOfDay"
                  value="12:00"
                  checked={timeOfDay === "12:00"}
                  onChange={() => setTimeOfDay("12:00")}
                />
                Midi (12h)
              </label>
              <label>
                <input
                  type="radio"
                  name="timeOfDay"
                  value="19:00"
                  checked={timeOfDay === "19:00"}
                  onChange={() => setTimeOfDay("19:00")}
                />
                Soir (19h)
              </label>
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
            <p>Place occupé</p>
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
        {hasSearched && voituresDisponibles.length === 0 && (
          <div className="no-results-message">
            <i className="fa fa-exclamation-circle"></i>
            <p>Aucun trajet trouvé pour vos critères</p>
            <p className="search-tip">
              Essayez d'élargir vos dates ou de vérifier les noms des villes
            </p>
          </div>
        )}

        {/* <div className="pre-search-message">
          <div className="search-icon-container">
            <i className="fa fa-search fa-3x"></i>
          </div>
          <h3>Recherchez votre trajet idéal</h3>
          <p>
            Veuillez sélectionner vos critères de voyage (ville de départ,
            destination, date, nombre de voyageur et heure) puis cliquez sur "Rechercher"
          </p>
          <div className="tips">
            <p>
              <i className="fa fa-lightbulb"></i> Conseil : Essayez d'élargir
              vos dates pour plus d'options
            </p>
          </div>
        </div> */}
        {!hasSearched && (
          <div className="pre-search-message">
            <div className="search-icon-container">
              <i className="fa fa-search fa-3x"></i>
            </div>
            <h3>Recherchez votre trajet idéal</h3>
            <p>
              Veuillez sélectionner vos critères de voyage (ville de départ,
              destination, date, nombre de voyageur et heure) puis cliquez sur
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

        {hasSearched && voituresDisponibles.length > 0 && (
        <>
          {/* {voituresDisponibles.map((voiture) => ( */}
          <Voiture_dispo
            // key={voiture.id}
            setShowPayment={setShowPayment}
            setReservationData={setReservationData}
            maxPlaces={travelers}
            occupiedPlaces={occupiedPlaces}
            totalPlaces={16}
            trajet={{
              depart: departure,
              arrivee: arrival,
              heureDepart: timeOfDay,
              prixUnitaire: prix,
            }}

            // data={voiture}
          />
          {/* ))} */}
        </>
        )}
      </div>
    </div>
  );
}

export default ReserverComp;
