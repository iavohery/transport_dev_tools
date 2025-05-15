import { useEffect, useState } from "react";
import Crud from "../components/crud";
import NavBarPage from "../components/navBarPage";
import {
  GetVoyage,
  AjouterVoyage,
  UpdateVoyage,
  DeleteVoyage,
} from "../assets/servicRoute/voyage.service";
import {
  GetTrajet,
  UpdateTrajet,
  DeleteTrajet,
  AjouterTrajet,
} from "../assets/servicRoute/trajet.service";
import {
  GetVoiture,
  UpdateVoiture,
  DeleteVoiture,
  AjouterVoiture,
} from "../assets/servicRoute/voiture.service";
import { GetChauffeur } from "../assets/servicRoute/chauffeur.service";

function Voyage() {
  const [Employee, setVoyage] = useState([]);
  const [Trajet, setTrajet] = useState([]);
  const [Voitures, setVoitures] = useState([]);
  const [Chauffeur, setChauffeur] = useState([]);

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
    const fetchTrajet = async () => {
      try {
        const response = await GetTrajet();
        const data = response.data.data;

        const formatted = data.map((v) => ({
          id: v.idtrajet,
          point_depart: v.point_depart,
          destination: v.destination,
        }));
        console.log(formatted);

        setTrajet(formatted);
      } catch (error) {
        console.error("Erreur lors de la récupération des trajet :", error);
      }
    };

    const fetchVoitures = async () => {
      try {
        const responseVoiture = await GetVoiture();
        const dataVoiture = responseVoiture.data.data;

        const formattedVoiture = dataVoiture.map((vo) => ({
          id: vo.idvoiture,
          matricule: vo.numero_matricule,
        }));
        console.log(formattedVoiture);

        setVoitures(formattedVoiture);
      } catch (error) {
        console.error("Erreur lors de la récupération des voitures :", error);
      }
    };

    const fetchChauffeur = async () => {
      try {
        const response = await GetChauffeur();
        const data = response.data.data;

        const formatted = data.map((v) => ({
          id: v.idemploye,
          nomEmp: v.Utilisateur.nom,
        }));
        console.log(formatted);

        setChauffeur(formatted);
      } catch (error) {
        console.error("Erreur lors de la récupération des Chauffeurs :", error);
      }
    };

    fetchVoyage();
    fetchTrajet();
    fetchVoitures();
    fetchChauffeur();
  }, []);

  return (
    <div>
      <NavBarPage />
      <Crud
        titre="Liste des employees"
        headers={[
          { key: "id", label: "ID" },
          { key: "statut", label: "Statut" },
          { key: "heure_depart", label: "Heure de Depart" },
          { key: "idtrajet", label: "Trajet" },
          { key: "idvoiture", label: "Voiture" },
          { key: "idemploye", label: "Chauffeur" },
          { key: "date", label: "Date du Voyage" },
        ]}
        data={Employee}
        dataID1={Trajet}
        dataID2={Voitures}
        dataID3={Chauffeur}
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
