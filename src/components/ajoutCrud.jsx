import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/crud.css";
import "font-awesome/css/font-awesome.min.css";

function AjoutCrud({ titre_ajout, setShowAjoutCrud, headers }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    console.log(formData);
    setShowAjoutCrud(false);
  };
  return (
    <div className="floucrud">
      <div className="floucrud1">
        <h2>Nouvelle {titre_ajout}</h2>
        <form action="">
          {headers.map((header, index) => {
            const getInputType = (headerText) => {
              const lowerHeader = headerText.toLowerCase();

              if (/(date|naissance|anniversaire)/.test(lowerHeader))
                return "date";
              if (
                /(montant|prix|quantité|quantite|nombre|Nombre)/.test(
                  lowerHeader
                )
              )
                return "number";
              if (/(email|e-mail|courriel|mail)/.test(lowerHeader))
                return "email";
              if (/(tel|phone|téléphone|telephone)/.test(lowerHeader))
                return "tel";
              if (/(url|site|web|link)/.test(lowerHeader)) return "url";
              if (/(password|motdepasse|mdp)/.test(lowerHeader))
                return "password";

              return "text";
            };

            const inputType = getInputType(header);
            const inputName = header.toLowerCase().replace(/\s+/g, "_");

            return (
              <div key={index} className="form-group__">
                <label>{header} :</label>
                <input
                  id="input__"
                  type={inputType}
                  name={inputName}
                  placeholder={`Entrez ${header}`}
                  onChange={handleChange}
                  {...(inputType === "number" && { min: 0, step: "any" })}
                  {...(inputType === "date" && {
                    max: new Date().toISOString().split("T")[0],
                  })}
                />
              </div>
            );
          })}
          <div className="btn_ajouter">
            <button id="annuler_ajout" onClick={() => setShowAjoutCrud(false)}>
              Annuler
            </button>
            <button id="ajouter_ajout">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AjoutCrud;
