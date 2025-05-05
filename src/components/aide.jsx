import { useState } from "react";
import "../css/aide.css";
import { Link, useLocation } from "react-router-dom";
import translogo from "../assets/translogo.png";

function Aide({ setShowAide }) {
  return (
    <div className="centre_aide">
      {/* <button id="btn_next" className="btn_next_1">
        <i className="fa fa-chevron-left"></i>
      </button> */}
      <div className="centre_aide1">
        <div className="entete_aide">
          <img src={translogo} alt="" />
          <div className="boule">
            {/* <div className="boule1"></div>
            <div className="boule1"></div>
            <div className="boule1"></div> */}
          </div>
          <button onClick={() => setShowAide(false)}>
            <i className="fa fa-times"></i>
          </button>
        </div>
        <div className="bas_aide">
          <div className="bas_aide1">
            <h2 id="titre_aide__">Comment pourrions-nous vous aider ?</h2>
            <div className="bas_aide_1 bas_aide11">
              <div className="haut_aide">
                <h4>Quels sont les modes de payements accéptés ?</h4>
                <i className="fa fa-info"></i>
              </div>
              <div className="bas_aide___">
                <p>
                  Les modes de payement accéptés sont Orange Money, Mvola,
                  Airtel Money, Carte Bancaire et Carte Visa.
                </p>
              </div>
            </div>
            <div className="bas_aide_2 bas_aide11">
              <div className="haut_aide">
                <h4>Comment nous contacter ?</h4>
                <i className="fa fa-info"></i>
              </div>
              <div className="bas_aide___">
                <p>
                  En visitant nos reseau sociaux(Facebook, Instagram), en
                  appelant, ou bien nous contacter via whatsap .
                </p>
              </div>
            </div>
            <div className="bas_aide_3 bas_aide11">
              <div className="haut_aide">
                <h4>Peut-on annuler une reservation ?</h4>
                <i className="fa fa-info"></i>
              </div>
              <div className="bas_aide___">
                <p>
                  Les reservations déja payés ne peuvent être annulé d'abord en
                  étant dans le siège de trans rapide et aussi 24h avant le
                  départ .
                </p>
              </div>
            </div>
            <div className="bas_aide_4 bas_aide11">
              <div className="haut_aide">
                <h4>Comment se déroule l'embarquement ?</h4>
                <i className="fa fa-info"></i>
              </div>
              <div className="bas_aide___">
                <p>
                  D'abord les bagages sont enregistrés puis obtention de billet
                  avec le numero de voiture correspondant et embarquement .
                </p>
              </div>
            </div>
          </div>
          {/* <div className="bas_aide2"></div>
          <div className="bas_aide3"></div> */}
        </div>
      </div>
      {/* <button id="btn_next" className="btn_next_2">
        <i className="fa fa-chevron-right"></i>
      </button> */}
    </div>
  );
}

export default Aide;
