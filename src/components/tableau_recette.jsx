import { useState,useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/tableau_recette.css";
import "font-awesome/css/font-awesome.min.css";

function Tableau_recette({
  data = [],
  columns = ["Jour", "Total"],
  title = "Tableau représentatif",
}) {
  const [searchType, setSearchType] = useState("jour");
  const [dateValue, setDateValue] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

   useEffect(() => {
     setIsButtonDisabled(!dateValue);
   }, [dateValue, searchType]);

  const handleSearch = () => {
    console.log(`Recherche ${searchType}:`, dateValue);
  };

  return (
    <div className="Tableau_recette">
      <h2>Rechercher par date</h2>
      <div className="recherche_recette">
        <select
          id="type_recherche"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="jour">Jour précis</option>
          <option value="mois">Mois</option>
          <option value="annee">Année</option>
        </select>

        {searchType === "jour" && (
          <div className="input-date">
            <input
              type="date"
              id="date_complete"
              value={dateValue}
              onChange={(e) => setDateValue(e.target.value)}
            />
          </div>
        )}

        {searchType === "mois" && (
          <div className="input-date">
            <input
              type="month"
              id="date_mois"
              value={dateValue}
              onChange={(e) => setDateValue(e.target.value)}
            />
          </div>
        )}

        {searchType === "annee" && (
          <div className="input-date">
            <input
              type="number"
              id="date_annee"
              min="1900"
              max="2099"
              placeholder="2024"
              value={dateValue}
              onChange={(e) => setDateValue(e.target.value)}
            />
          </div>
        )}
        <button
          className={isButtonDisabled ? "disabled-button" : ""}
          onClick={handleSearch}
        >
          <i className="fa fa-search"></i>
        </button>
      </div>

      <h2>{title}</h2>
      <table>
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((col, idx) => (
                <td key={idx}>{item[col.toLowerCase()]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tableau_recette;
