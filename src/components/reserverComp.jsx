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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchPerformed(true);

    console.log({
      departure,
      arrival,
      reservationDate,
      travelers,
      timeOfDay,
    });
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
              >
                +
              </button>
            </div>
          </div>

          <div className="form-group1">
            <label>Heure de départ:</label>
            <div className="time-options">
              <label>
                <input
                  type="radio"
                  name="timeOfDay"
                  value="morning"
                  checked={timeOfDay === "morning"}
                  onChange={() => setTimeOfDay("morning")}
                />
                Matin
              </label>
              <label>
                <input
                  type="radio"
                  name="timeOfDay"
                  value="afternoon"
                  checked={timeOfDay === "afternoon"}
                  onChange={() => setTimeOfDay("afternoon")}
                />
                Midi
              </label>
              <label>
                <input
                  type="radio"
                  name="timeOfDay"
                  value="evening"
                  checked={timeOfDay === "evening"}
                  onChange={() => setTimeOfDay("evening")}
                />
                Soir
              </label>
            </div>
          </div>

          <button className="submit-btn">
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
        {/* <div className="no-results-message">
            <i className="fa fa-exclamation-circle"></i>
            <p>Aucun trajet trouvé pour vos critères de recherche</p>
          </div> */}
        <Voiture_dispo
          setShowPayment={setShowPayment}
          setReservationData={setReservationData}
        />
        <Voiture_dispo
          setShowPayment={setShowPayment}
          setReservationData={setReservationData}
        />
      </div>
    </div>
  );
}

export default ReserverComp;
