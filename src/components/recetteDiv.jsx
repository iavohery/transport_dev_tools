import { forwardRef } from "react";
import "../css/recetteDiv.css";

const RecetteDiv = forwardRef((props, ref) => {
  return (
    <div className="recetteDiv" ref={ref}>
      <div id="chiffre-affaire" className="chiffre section"></div>
      <div id="depenses" className="depense section"></div>
      <div id="benefice" className="benefice section"></div>
      <div id="trajet" className="trajet section"></div>
    </div>
  );
});

export default RecetteDiv;
