import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/tableau_recette.css";
import "font-awesome/css/font-awesome.min.css";

function Tableau_recette({
  data = [],
  columns = ["Date", "Valeur"],
  title = "Tableau représentatif",
}) {
  return (
    <div className="Tableau_recette">
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
