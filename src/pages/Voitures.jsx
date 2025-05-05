import { useEffect, useState } from "react";
import Crud from "../components/crud";
import NavBarPage from "../components/navBarPage";
import GetVoiture from "../assets/servicRoute/voiture.service";

function Voitures() {
  const [voitures, setVoitures] = useState([]);

  useEffect(() => {
    const fetchVoitures = async () => {
      try {
        const response = await GetVoiture();
        const data = response.data.data;

        const formatted = data.map((v) => ({
          id: v.idvoiture,
          matricule: v.capacite,
          numero: v.numero,
          marque: v.marque,
          capacite: v.capacite,
        }));
        console.log(formatted);

        setVoitures(formatted);
      } catch (error) {
        console.error("Erreur lors de la récupération des voitures :", error);
      }
    };

    fetchVoitures();
  }, []);

  return (
    <div>
      <NavBarPage />
      <Crud
        titre="Liste des Voitures"
        headers={["ID", "Matricule", "Numéro", "Marque", "Capacité"]}
        data={voitures}
      />
    </div>
  );
}

export default Voitures;
