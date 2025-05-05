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
            {/* <div className="bas_aide_1 bas_aide11">
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
            </div> */}
            {/* Section Paiement */}
            <div className="bas_aide_1 bas_aide11">
              <div className="haut_aide">
                <h4>Modes de paiement acceptés</h4>
                <i className="fa fa-credit-card"></i>
              </div>
              <div className="bas_aide___">
                <p>
                  Notre coopérative accepte différents modes de paiement
                  sécurisés :
                </p>
                <ul>
                  <li>Mobile Money (Mvola, Orange Money, Airtel Money)</li>
                  <li>Cartes bancaires (Visa, Mastercard)</li>
                  <li>Paiement en espèces dans nos agences</li>
                  <li>Virement bancaire (sur demande)</li>
                </ul>
                {/* <p className="note">
                  Les paiements en ligne sont cryptés et sécurisés.
                </p> */}
              </div>
            </div>

            {/* Section Contact */}
            <div className="bas_aide_2 bas_aide11">
              <div className="haut_aide">
                <h4>Contactez notre coopérative</h4>
                <i className="fa fa-headset"></i>
              </div>
              <div className="bas_aide___">
                <p>Plusieurs canaux à votre disposition :</p>
                <ul>
                  <li>
                    <strong>Service client</strong> : +261 32 07 940 01 (7j/7,
                    6h-22h)
                  </li>
                  <li>
                    <strong>WhatsApp</strong> : +261 32 07 940 01 (réponse
                    immédiate)
                  </li>
                  <li>
                    <strong>Réseaux sociaux</strong> : @TransRapideMG (Facebook,
                    Instagram)
                  </li>
                  <li>
                    <strong>Agences</strong> : Retrouvez nos points de vente
                    dans toutes les gares
                  </li>
                </ul>
              </div>
            </div>

            {/* Section Annulation */}
            <div className="bas_aide_3 bas_aide11">
              <div className="haut_aide">
                <h4>Politique d'annulation</h4>
                <i className="fa fa-calendar-times"></i>
              </div>
              <div className="bas_aide___">
                <p>
                  En tant que coopérative, nous appliquons une politique
                  d'annulation équitable :
                </p>
                <ul>
                  <li>
                    Annulation gratuite jusqu'à 48h avant le départ
                    (remboursement intégral)
                  </li>
                  <li>
                    Annulation entre 24h et 48h avant départ (frais de 20%)
                  </li>
                  <li>
                    Pas d'annulation possible moins de 24h avant le départ
                  </li>
                  <li>
                    En cas de force majeure, contactez notre service client
                  </li>
                </ul>
              </div>
            </div>

            {/* Section Embarquement */}
            <div className="bas_aide_4 bas_aide11">
              <div className="haut_aide">
                <h4>Procédure d'embarquement</h4>
                <i className="fa fa-bus"></i>
              </div>
              <div className="bas_aide___">
                <p>Pour un voyage en toute sérénité :</p>
                <ul>
                  <li>Présentez-vous 45min avant le départ</li>
                  <li>Enregistrement des bagages (max 20kg/pers)</li>
                  <li>
                    Retrait du billet au guichet ou présentation du e-billet
                  </li>
                  <li>Embarquement par ordre d'arrivée</li>
                </ul>
                {/* <p className="note">
                  Les membres de la coopérative bénéficient d'un embarquement
                  prioritaire.
                </p> */}
              </div>
            </div>

            {/* Nouvelles sections recommandées */}
            <div className="bas_aide_5 bas_aide11">
              <div className="haut_aide">
                <h4>Avantages membres coopératifs</h4>
                <i className="fa fa-percent"></i>
              </div>
              <div className="bas_aide___">
                <p>Rejoignez notre communauté coopérative :</p>
                <ul>
                  <li>10% de réduction sur tous vos trajets</li>
                  <li>Accumulation de points échangeables</li>
                  <li>Accès aux offres exclusives</li>
                  <li>Droit de vote aux assemblées générales</li>
                </ul>
              </div>
            </div>

            <div className="bas_aide_6 bas_aide11">
              <div className="haut_aide">
                <h4>Sécurité et confort</h4>
                <i className="fa fa-shield-alt"></i>
              </div>
              <div className="bas_aide___">
                <p>Nos engagements qualité :</p>
                <ul>
                  <li>Véhicules contrôlés quotidiennement</li>
                  <li>Chauffeurs diplômés et expérimentés</li>
                  <li>Assurance voyage incluse</li>
                  <li>Climatisation dans tous nos véhicules</li>
                  <li>Service de rafraîchissements à bord</li>
                </ul>
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
