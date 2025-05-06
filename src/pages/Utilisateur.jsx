import { useState, useEffect } from "react";
import axios from "axios";
import Crud from "../components/crud";
import NavBarPage from "../components/navBarPage";
import {
  AjouterUtilisateur,
  DeleteUtilisateur,
  GetUtilisateur,
  UpdateUtilisateur,
} from "../assets/adminservice/serviceutilisateur";

function Utilisateur() {
  const [utilisateurs, setUtilisateurs] = useState([]);

  const fetchUtilisateurs = async () => {
    try {
      const response = await GetUtilisateur();
      const data = response.data.data;

      const formatted = data.map((v) => ({
        id: v.iduser,
        numcin: v.numcin,
        nom: v.nom,
        numtel: v.numtel,
        mot_passe: v.mot_passe,
      }));
      console.log(formatted);

      setUtilisateurs(formatted);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    }
  };
  
  useEffect(() => {
    fetchUtilisateurs();
  }, []);
  const updateUtilisateur = async (id, updatedData) => {
    try {
      await UpdateUtilisateur(id,updatedData);
      fetchUtilisateurs();
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };
  const deleteUtilisateur = async (id) => {
    try {
      await DeleteUtilisateur(id);
      fetchUtilisateurs();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  return (
    <div>
      <NavBarPage />
      <Crud
        titre="utilisateur"
        headers={["ID", "numcin", "nom", "numtel", "mot_passe"]}
        data={utilisateurs}
        onUpdate={updateUtilisateur}
        onDelete={deleteUtilisateur}
      />
    </div>
  );
}

export default Utilisateur;
