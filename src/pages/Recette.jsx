import { useRef, useEffect } from "react";
import Dashboard from "../components/dashboard";
import NavBarPage from "../components/navBarPage";
import RecetteDiv from "../components/recetteDiv";

function Recette() {
  const recetteDivRef = useRef();

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) {
        const sectionId = window.location.hash.substring(1);
        document.getElementById(sectionId)?.scrollIntoView();
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div>
      <NavBarPage />
      <Dashboard />
      <RecetteDiv ref={recetteDivRef} />
    </div>
  );
}

export default Recette;
