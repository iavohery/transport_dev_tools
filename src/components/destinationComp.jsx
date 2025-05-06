import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/destinationComp.css";
import Desti from "./desti";
import tana from "../assets/tana.jpg";
import fianara from "../assets/fianara.jpg";
import antsirabe from "../assets/antsirabe.jpg";
import ambositra from "../assets/ambositra1.jpg";
import antsiranana from "../assets/antsiranana.jpg";
import mahajanga from "../assets/mahajanga.jpg";

function DestinationComp() {
  const cities = [
    { name: "Antananarivo", image: tana },
    { name: "Fianarantsoa", image: fianara },
    { name: "Antsirabe", image: antsirabe },
    { name: "Ambositra", image: ambositra },
    { name: "Antsiranana", image: antsiranana },
    { name: "Mahajanga", image: mahajanga },
  ];

  return (
    <div className="centredestination">
      <h3>
        Plusieurs destinations disponibles
      </h3>
      <p>Choisissez celle qui vous convient</p>
      <div className="centredestination_1">
        {cities.map((city, index) => (
          <Desti key={index} destination_titre={city.name} image={city.image} />
        ))}
      </div>
    </div>
  );
}

export default DestinationComp;
