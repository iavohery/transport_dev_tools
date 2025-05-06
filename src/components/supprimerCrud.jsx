import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/crud.css";
import "font-awesome/css/font-awesome.min.css";

function SupprimerCrud({ titre_sup, setShowSupCrud }) {
  
  return (
    <div className="floucrud">
      <div className="floucrud1_2">
        <h2>Voulez vous supprimer cet {titre_sup} ?</h2>
        <p>Cet élément va être supprimé définitivement</p>
        <div className="btn_supprimer">
          <button id="oui_sup" onClick={() =>{ setShowSupCrud(false)}}>OUI</button>
          <button id="non_sup" onClick={() => setShowSupCrud(false)}>
            NON
          </button>
        </div>
      </div>
    </div>
  );
}

export default SupprimerCrud;
