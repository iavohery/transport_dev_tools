import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/desti.css";
import "font-awesome/css/font-awesome.min.css";

function Desti({ destination_titre,image }) {
  return (
    <div className="desti">
      <div className="image">
        <img id="image_dest" src={image} alt="" />
      </div>
      <div className="bas">
        <h2>
          <i className="fa fa-map-marker"></i>
          <span>{destination_titre}</span>
        </h2>
        <button>Reserver</button>
      </div>
    </div>
  );
}

export default Desti;
