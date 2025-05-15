import { useEffect, useState } from "react";
import Crud from "../components/crud";
import NavBarPage from "../components/navBarPage";
import {
  GetTrajet,
  UpdateTrajet,
  DeleteTrajet,
  AjouterTrajet,
} from "../assets/servicRoute/trajet.service";

function Trajet() {
  const [Trajet, setTrajet] = useState([]);

  useEffect(() => {
    const fetchTrajet = async () => {
      try {
        const response = await GetTrajet();
        const data = response.data.data;

        const formatted = data.map((v) => ({
          id: v.idtrajet,
          point_depart: v.point_depart,
          destination: v.destination,
          tarif: v.tarif,
        }));
        console.log(formatted);

        setTrajet(formatted);
      } catch (error) {
        console.error("Erreur lors de la récupération des trajet :", error);
      }
    };

    fetchTrajet();
  }, []);

  return (
    <div>
      <NavBarPage />
      <Crud
        titre="Liste des Voitures"
        headers={[
          { key: "id", label: "ID" },
          { key: "point_depart", label: "Point de Depart" },
          { key: "destination", label: "Destination" },
          { key: "tarif", label: "Tarif du Trajet" },
        ]}
        data={Trajet}
        onDataChange={async (id, newData) => {
          try {
            if (newData === null) {
              await DeleteTrajet(id);
            } else {
              // Transformation des données dans le format attendu par l'API
              const trajetPayload = {
                point_depart: newData.point_depart,
                destination: newData.destination,
                tarif: parseInt(newData.tarif),
              };

              if (id === null) {
                await AjouterTrajet(trajetPayload);
              } else {
                await UpdateTrajet(id, trajetPayload);
              }
            }

            // Recharge des données
            const response = await GetTrajet();
            const data = response.data.data;
            const formatted = data.map((v) => ({
              id: v.idtrajet,
              point_depart: v.point_depart,
              destination: v.destination,
              tarif: v.tarif,
            }));
            setTrajet(formatted);
          } catch (error) {
            console.error("Erreur lors de l'opération CRUD :", error);
          }
        }}
        onDelete={async (id) => {
          try {
            await DeleteTrajet(id); // appelle ton service API
            // Recharge les données après suppression
            const response = await GetTrajet();
            const data = response.data.data;
            const formatted = data.map((v) => ({
              id: v.idtrajet,
              point_depart: v.point_depart,
              destination: v.destination,
              tarif: v.tarif,
            }));
            setTrajet(formatted);
          } catch (error) {
            console.error("Erreur lors de la suppression :", error);
          }
        }}
      />
    </div>
  );
}

export default Trajet;
