import { useEffect, useState } from "react";
import Crud from "../components/crud";
import NavBarPage from "../components/navBarPage";
import {
  GetPoste,
  UpdatePoste,
  DeletePoste,
  AjouterPoste,
} from "../assets/servicRoute/poste.service";

function Poste() {
  const [Poste, setPoste] = useState([]);

  useEffect(() => {
    const fetchPoste = async () => {
      try {
        const response = await GetPoste();
        const data = response.data.data;

        const formatted = data.map((v) => ({
          id: v.idposte,
          nom_poste: v.nom_poste,
        }));
        console.log(formatted);

        setPoste(formatted);
      } catch (error) {
        console.error("Erreur lors de la récupération des trajet :", error);
      }
    };

    fetchPoste();
  }, []);

  return (
    <div>
      <NavBarPage />
      <Crud
        titre="Liste des Voitures"
        headers={[
          { key: "id", label: "ID" },
          { key: "nom_poste", label: "Nom du Poste" },
        ]}
        data={Poste}
        onDataChange={async (id, newData) => {
          try {
            if (newData === null) {
              await DeletePoste(id);
            } else {
              // Transformation des données dans le format attendu par l'API
              const trajetPayload = {
                nom_poste: newData.nom_poste,
              };

              if (id === null) {
                await AjouterPoste(trajetPayload);
              } else {
                await UpdatePoste(id, trajetPayload);
              }
            }

            // Recharge des données
            const response = await GetPoste();
            const data = response.data.data;
            const formatted = data.map((v) => ({
              id: v.idposte,
              nom_poste: v.nom_poste,
            }));
            setPoste(formatted);
          } catch (error) {
            console.error("Erreur lors de l'opération CRUD :", error);
          }
        }}
        onDelete={async (id) => {
          try {
            await DeletePoste(id); // appelle ton service API
            // Recharge les données après suppression
            const response = await GetPoste();
            const data = response.data.data;
            const formatted = data.map((v) => ({
              id: v.idposte,
              nom_poste: v.nom_poste,
            }));
            setPoste(formatted);
          } catch (error) {
            console.error("Erreur lors de la suppression :", error);
          }
        }}
      />
    </div>
  );
}

export default Poste;
