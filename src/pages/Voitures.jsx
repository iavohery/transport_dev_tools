import { useEffect, useState } from "react";
import Crud from "../components/crud";
import NavBarPage from "../components/navBarPage";
import {
  GetVoiture,
  UpdateVoiture,
  DeleteVoiture,
  AjouterVoiture,
} from "../assets/servicRoute/voiture.service";

function Voitures() {
  const [voitures, setVoitures] = useState([]);

  useEffect(() => {
    const fetchVoitures = async () => {
      try {
        const response = await GetVoiture();
        const data = response.data.data;

        const formatted = data.map((v) => ({
          id: v.idvoiture,
          matricule: v.numero_matricule,
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
        headers={[
          { key: "id", label: "ID" },
          { key: "matricule", label: "Matricule" },
          { key: "numero", label: "Numero" },
          { key: "marque", label: "Marque" },
          { key: "capacite", label: "Capacite" },
        ]}
        data={voitures}
        onDataChange={async (id, newData) => {
          try {
            if (newData === null) {
              await DeleteVoiture(id);
            } else {
              // Transformation des données dans le format attendu par l'API
              const voiturePayload = {
                numero_matricule: newData.matricule,
                numero: newData.numero,
                marque: newData.marque,
                capacite: parseInt(newData.capacite),
              };

              if (id === null) {
                await AjouterVoiture(voiturePayload);
              } else {
                await UpdateVoiture(id, voiturePayload);
              }
            }

            // Recharge des données
            const response = await GetVoiture();
            const data = response.data.data;
            const formatted = data.map((v) => ({
              id: v.idvoiture,
              matricule: v.numero_matricule,
              numero: v.numero,
              marque: v.marque,
              capacite: v.capacite,
            }));
            setVoitures(formatted);
          } catch (error) {
            console.error("Erreur lors de l'opération CRUD :", error);
          }
        }}
        onDelete={async (id) => {
          try {
            await DeleteVoiture(id); // appelle ton service API
            // Recharge les données après suppression
            const response = await GetVoiture();
            const data = response.data.data;
            const formatted = data.map((v) => ({
              id: v.idvoiture,
              matricule: v.numero_matricule,
              numero: v.numero,
              marque: v.marque,
              capacite: v.capacite,
            }));
            setVoitures(formatted);
          } catch (error) {
            console.error("Erreur lors de la suppression :", error);
          }
        }}
      />
    </div>
  );
}

export default Voitures;
