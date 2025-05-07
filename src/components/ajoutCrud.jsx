import { useState } from "react";
import "../css/crud.css";
import "font-awesome/css/font-awesome.min.css";

function AjoutCrud({ titre_ajout, setShowAjoutCrud, headers, onAddData }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (/(numcin)/i.test(name)) {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length > 12) return;
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAddData) {
      onAddData(formData);
    }
    setShowAjoutCrud(false);
  };

  return (
    <div className="floucrud">
      <div className="floucrud1">
        <h2>Nouvelle {titre_ajout}</h2>
        <form onSubmit={handleSubmit}>
          {headers.map(({ key, label }, index) => {
            const inputType = getInputType(key);
            const isCinField = /(numcin)/i.test(key);

            return (
              <div key={index} className="form-group__">
                <label>{label} :</label>
                <input
                  id="input__"
                  type={isCinField ? "text" : inputType}
                  name={key}
                  value={formData[key] || ""}
                  placeholder={`Entrez ${label}`}
                  onChange={handleChange}
                  {...(inputType === "number" && { min: 0, step: "any" })}
                />
              </div>
            );
          })}

          <div className="btn_ajouter">
            <button
              id="annuler_ajout"
              type="button"
              onClick={() => setShowAjoutCrud(false)}
            >
              Annuler
            </button>
            <button id="ajouter_ajout" type="submit">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Utilise la clé pour deviner le type d'input
function getInputType(headerKey) {
  const key = headerKey.toLowerCase();
  if (/(date|naissance|anniversaire)/.test(key)) return "date";
  if (/(montant|prix|quantité|quantite|nombre|id|capacite|salaire)/.test(key))
    return "number";
  if (/(email|e-mail|courriel|mail)/.test(key)) return "email";
  if (/(tel|phone|téléphone|telephone)/.test(key)) return "tel";
  if (/(url|site|web|link)/.test(key)) return "url";
  if (/(password|motdepasse|mdp)/.test(key)) return "password";
  return "text";
}

export default AjoutCrud;
