import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/deconnecter.css";

function Deconnecter({ setShowDeco }) {
  return (
    <div className="cont">
      <div className="cont1">
        <h2>Voulez vous vous déconnecter ?</h2>
        <div className="button">
          <Link to="/Admin">
            <button>OUI</button>
          </Link>
          <button onClick={() => setShowDeco(false)} id="non2">
            NON
          </button>
        </div>
      </div>
    </div>
  );
}

export default Deconnecter;
