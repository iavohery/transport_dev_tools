import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/payement.css";
import "font-awesome/css/font-awesome.min.css";

function Payement({ setShowPayment, placesCount, totalPrice }) {
  const [activePayment, setActivePayment] = useState(null);
  const [isValidated, setIsValidated] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    cin: "",
    numero: "",
  });

  const handlePaymentClick = (paymentMethod) => {
    setActivePayment(paymentMethod);
  };
  const handleCloseDetails = () => {
    setActivePayment(null);
    setFormData({
      nom: "",
      prenom: "",
      cin: "",
      numero: "",
    });
  };

  const handleValidation = () => {
    if (isFormValid()) {
      setIsValidated(true);
      setTimeout(() => {
        setShowPayment(false);
        setIsValidated(false);
        setActivePayment(null);
        setFormData({
          nom: "",
          prenom: "",
          cin: "",
          numero: "",
        });
      }, 1000);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    let processedValue = value;

    if (id === "nom") {
      processedValue = value.toUpperCase();
    } else if (id === "cin") {
      processedValue = value.replace(/\D/g, "").slice(0, 12);
    }

    setFormData((prev) => ({
      ...prev,
      [id]: processedValue,
    }));
  };

  const isFormValid = () => {
    return (
      formData.nom.trim() !== "" &&
      formData.prenom.trim() !== "" &&
      formData.cin.trim() !== "" &&
      formData.cin.length === 12 &&
      formData.numero.trim() !== "" &&
      activePayment !== null
    );
  };
  return (
    <div className="payement">
      <div className="payement1">
        <div className="payement1_1">
          <div className="entete_pay">
            <h3>Selectionner votre mode de payement</h3>
            <button onClick={() => setShowPayment(false)}>
              <i className="fa fa-times"></i>
            </button>
          </div>
          <div className="btn_pay">
            <button onClick={() => handlePaymentClick("Mvola")}>MVola</button>
            <button onClick={() => handlePaymentClick("Orange Money")}>
              Orange Money
            </button>
            <button onClick={() => handlePaymentClick("Airtel Money")}>
              Airtel Money
            </button>
            <button onClick={() => handlePaymentClick("Carte Bancaire")}>
              Carte Bancaire
            </button>
            <button onClick={() => handlePaymentClick("Carte Visa")}>
              Carte Visa
            </button>
          </div>
        </div>
        <div className={`payement1_2 ${activePayment ? "apparait" : ""}`}>
          {activePayment && (
            <div className="payment-details">
              <div className="entete_pay_2">
                <h3>Détails pour {activePayment}</h3>
                <button onClick={handleCloseDetails}>
                  <i className="fa fa-chevron-down"></i>
                </button>
              </div>
              <div className="bas_pay">
                <div className="infos-reservation">
                  <div className="info-item">
                    <span className="info-label">Nombre de places :</span>
                    <span className="info-value">{placesCount}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Montant à payer :</span>
                    <span className="info-value">
                      {totalPrice.toLocaleString()} Ar
                    </span>
                  </div>
                </div>

                <div className="form-paiement">
                  <div className="form-group2">
                    <label htmlFor="nom">Nom :</label>
                    <input
                      type="text"
                      id="nom"
                      placeholder="Votre nom"
                      required
                      value={formData.nom}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group2">
                    <label htmlFor="prenom">Prénom :</label>
                    <input
                      type="text"
                      id="prenom"
                      placeholder="Votre prénom"
                      required
                      value={formData.prenom}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group2">
                    <label htmlFor="cin">CIN :</label>
                    <input
                      type="text"
                      id="cin"
                      placeholder="Votre numéro CIN"
                      required
                      value={formData.cin}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group2">
                    <label htmlFor="numero">Numéro de téléphone :</label>
                    <input
                      type="tel"
                      id="numero"
                      placeholder="Votre numéro"
                      required
                      value={formData.numero}
                      onChange={handleInputChange}
                    />
                  </div>
            <div className="btn_validation_payement">
                  <button
                    className={`btn-valider-paiement ${
                      !isFormValid() ? "disabled" : ""
                    } ${isValidated ? "validated" : ""}`}
                    disabled={!isFormValid()}
                    onClick={handleValidation}
                  >
                    <span>Valider le paiement</span>
                    <i className="fa fa-check-circle"></i>
                  </button>

            </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Payement;
