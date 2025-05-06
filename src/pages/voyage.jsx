import { useEffect, useState } from "react";
import Crud from "../components/crud";
import NavBarPage from "../components/navBarPage";
import {
  GetVoyage,
  AjouterVoyage,
  UpdateVoyage,
  DeleteVoyage,
} from "../assets/servicRoute/voyage.service";

function Voyage() {
  const [Employee, setVoyage] = useState([]);

  useEffect(() => {
    const fetchVoyage = async () => {
      try {
        const response = await GetVoyage();
        const data = response.data.data;

        const formatted = data.map((v) => ({
          id: v.idvoyage,
          date: v.date,
          statut: v.statut,
          heure_depart: v.heure_depart,
          idtrajet: v.idtrajet,
          idvoiture: v.idvoiture,
          idemploye: v.idemploye,
        }));
        console.log(formatted);

        setVoyage(formatted);
      } catch (error) {
        console.error("Erreur lors de la récupération des voyage :", error);
      }
    };

    fetchVoyage();
  }, []);

  return (
    <div>
      <NavBarPage />
      <Crud
        titre="Liste des employees"
        headers={[
          "ID",
          "statut",
          "heure_depart",
          "idtrajet",
          "idvoiture",
          "idemploye",
          "date",
        ]}
        data={Employee}
        onDataChange={async (id, newData) => {
          try {
            if (newData === null) {
              await DeleteVoyage(id);
            } else {
              // Transformation des données dans le format attendu par l'API
              const voyagePayload = {
                date: newData.date,
                statut: newData.statut,
                heure_depart: newData.heure_depart,
                idtrajet: parseInt(newData.idtrajet),
                idvoiture: parseInt(newData.idvoiture),
                idemploye: parseInt(newData.idemploye),
              };

              if (id === null) {
                await AjouterVoyage(voyagePayload);
              } else {
                console.log(id, voyagePayload);
                await UpdateVoyage(id, voyagePayload);
              }
            }

            // Recharge des données
            const response = await GetVoyage();
            const data = response.data.data;
            const formatted = data.map((v) => ({
              id: v.idvoyage,
              date: v.date,
              statut: v.statut,
              heure_depart: v.heure_depart,
              idtrajet: v.idtrajet,
              idvoiture: v.idvoiture,
              idemploye: v.idemploye,
            }));
            setVoyage(formatted);
          } catch (error) {
            console.error("Erreur lors de l'opération CRUD :", error);
          }
        }}
        onDelete={async (id) => {
          try {
            await DeleteVoyage(id); // appelle ton service API
            // Recharge les données après suppression
            const response = await GetVoyage();
            const data = response.data.data;
            const formatted = data.map((v) => ({
              id: v.idvoyage,
              date: v.date,
              statut: v.statut,
              heure_depart: v.heure_depart,
              idtrajet: v.idtrajet,
              idvoiture: v.idvoiture,
              idemploye: v.idemploye,
            }));
            setVoyage(formatted);
          } catch (error) {
            console.error("Erreur lors de la suppression :", error);
          }
        }}
      />
    </div>
  );
}

export default Voyage;
