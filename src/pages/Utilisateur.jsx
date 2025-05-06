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
        console.log(formatted);

        setUtilisateur(formatted);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des l'utilisateur :",
          error
        );
      }
    };

    fetchUtilisateur();
  }, []);

  return (
    <div>
      <NavBarPage />
      <Crud
        titre="Liste des utilisateurs"
        headers={["ID", "Nom", "numcin", "numtel", "mot_passe"]}
        data={Trajet}
        onDataChange={async (id, newData) => {
          try {
            if (newData === null) {
              await DeleteUtilisateur(id);
            } else {
              // Transformation des données dans le format attendu par l'API
              const utilisateurPayload = {
                nom: newData.nom,
                numcin: newData.numcin,
                numtel: newData.numtel,
                mot_passe: newData.mot_passe,
              };

              if (id === null) {
                console.log(utilisateurPayload);
                await AjouterUtilisateur(utilisateurPayload);
              } else {
                await UpdateUtilisateur(id, utilisateurPayload);
              }
            }

            // Recharge des données
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
            await DeleteUtilisateur(id); // appelle ton service API
            // Recharge les données après suppression
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
