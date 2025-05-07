import { useEffect, useState } from "react";
import Crud from "../components/crud";
import NavBarPage from "../components/navBarPage";
import {
  AjouterUtilisateur,
  DeleteUtilisateur,
  GetUtilisateur,
  UpdateUtilisateur,
} from "../assets/servicRoute/user.service";

function Utilisateur() {
  const [Trajet, setUtilisateur] = useState([]);

  useEffect(() => {
    const fetchUtilisateur = async () => {
      try {
        const response = await GetUtilisateur();
        const data = response.data.data;

        const formatted = data.map((v) => ({
          id: v.iduser,
          nom: v.nom,
          numcin: v.numcin,
          numtel: v.numtel,
          mot_passe: v.mot_passe,
        }));
        setUtilisateur(formatted);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
      }
    };

    fetchUtilisateur();
  }, []);

  return (
    <div>
      <NavBarPage />
      <Crud
        titre="utilisateur"
        headers={[
          { key: "id", label: "ID" },
          { key: "nom", label: "Nom" },
          { key: "numcin", label: "Numéro CIN" },
          { key: "numtel", label: "Numéro Téléphone" },
          { key: "mot_passe", label: "Mot de passe" },
        ]}
        data={Trajet}
        onDataChange={async (id, newData) => {
          try {
            if (newData === null) {
              await DeleteUtilisateur(id);
            } else {
              const utilisateurPayload = {
                nom: newData.nom,
                numcin: newData.numcin,
                numtel: newData.numtel,
                mot_passe: newData.mot_passe,
              };

              if (id === null) {
                await AjouterUtilisateur(utilisateurPayload);
              } else {
                await UpdateUtilisateur(id, utilisateurPayload);
              }
            }

            const response = await GetUtilisateur();
            const data = response.data.data;
            const formatted = data.map((v) => ({
              id: v.iduser,
              nom: v.nom,
              numcin: v.numcin,
              numtel: v.numtel,
              mot_passe: v.mot_passe,
            }));
            setUtilisateur(formatted);
          } catch (error) {
            console.error("Erreur lors de l'opération CRUD :", error);
          }
        }}
        onDelete={async (id) => {
          try {
            await DeleteUtilisateur(id);
            const response = await GetUtilisateur();
            const data = response.data.data;
            const formatted = data.map((v) => ({
              id: v.iduser,
              nom: v.nom,
              numcin: v.numcin,
              numtel: v.numtel,
              mot_passe: v.mot_passe,
            }));
            setUtilisateur(formatted);
          } catch (error) {
            console.error("Erreur lors de la suppression :", error);
          }
        }}
      />
    </div>
  );
}

export default Utilisateur;
