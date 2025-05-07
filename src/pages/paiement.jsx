import { useEffect, useState } from "react";
import Crud from "../components/crud";
import NavBarPage from "../components/navBarPage";
import {
  AjouterPaiement,
  DeletePaiement,
  GetPaiement,
  UpdatePaiement,
} from "../assets/servicRoute/paiement.service";

function Paiement() {
  const [Paiement, setPaiement] = useState([]);

  useEffect(() => {
    const fetchPaiement = async () => {
      try {
        const response = await GetPaiement();
        const data = response.data.data;

        const formatted = data.map((v) => ({
          id: v.idpaiement,
          montant_total: v.montant_total,
          mode_paiment: v.mode_paiment,
          statut: v.statut,
          date: v.date,
        }));
        console.log(formatted);

        setPaiement(formatted);
      } catch (error) {
        console.error("Erreur lors de la récupération du paiement :", error);
      }
    };

    fetchPaiement();
  }, []);

  return (
    <div>
      <NavBarPage />
      <Crud
        titre="Liste des paiement"
        headers={["ID", "montant_total", "mode_paiment", "statut", "date"]}
        data={Paiement}
        onDataChange={async (id, newData) => {
          try {
            if (newData === null) {
              await DeletePaiement(id);
            } else {
              // Transformation des données dans le format attendu par l'AP   I
              const paiementPayload = {
                montant_total: parseInt(newData.montant_total),
                mode_paiment: newData.mode_paiment,
                statut: newData.statut,
                date: newData.date,
              };

              if (id === null) {
                console.log(paiementPayload);
                await AjouterPaiement(paiementPayload);
              } else {
                await UpdatePaiement(id, paiementPayload);
              }
            }

            // Recharge des données
            const response = await GetPaiement();
            const data = response.data.data;
            const formatted = data.map((v) => ({
              id: v.idpaiement,
              montant_total: v.montant_total,
              mode_paiment: v.mode_paiment,
              statut: v.statut,
              date: v.date,
            }));
            setPaiement(formatted);
          } catch (error) {
            console.error("Erreur lors de l'opération CRUD :", error);
          }
        }}
        onDelete={async (id) => {
          try {
            await DeletePaiement(id); // appelle ton service API
            // Recharge les données après suppression
            const response = await GetPaiement();
            const data = response.data.data;
            const formatted = data.map((v) => ({
              id: v.idpaiement,
              montant_total: v.montant_total,
              mode_paiment: v.mode_paiment,
              statut: v.statut,
              date: v.date,
            }));
            setPaiement(formatted);
          } catch (error) {
            console.error("Erreur lors de la suppression :", error);
          }
        }}
      />
    </div>
  );
}

export default Paiement;
