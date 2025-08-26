import { useEffect, useState } from "react";
import Crud from "../components/crud";
import NavBarPage from "../components/navBarPage";
import {
  AjouterUtilisateur,
  DeleteUtilisateur,
  GetUtilisateur,
  UpdateUtilisateur,
} from "../assets/servicRoute/user.service";
import bcrypt from "bcryptjs";

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
        console.error(
          "Erreur lors de la récupération des utilisateurs :",
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
              let motPasseHashe = newData.mot_passe;

              // Hasher le mot de passe seulement lors de l'ajout
              if (id === null && newData.mot_passe) {
                const salt = await bcrypt.genSalt(10);
                motPasseHashe = await bcrypt.hash(newData.mot_passe, salt);
              }

              const utilisateurPayload = {
                nom: newData.nom,
                numcin: newData.numcin,
                numtel: newData.numtel,
                mot_passe: motPasseHashe,
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
      />
    </div>
  );
}

export default Utilisateur;
