import { useEffect, useState } from "react";
import Crud from "../components/crud";
import NavBarPage from "../components/navBarPage";
import {
  AjouterDepense,
  DeleteDepense,
  GetDepense,
  UpdateDepense,
} from "../assets/servicRoute/depense.service";

function Depense() {
  const [Depense, setDepense] = useState([]);

  useEffect(() => {
    const fetchDepenses = async () => {
      try {
        const response = await GetDepense();
        const data = response.data.data;

        const formatted = data.map((v) => ({
          id: v.iddepense,
          type: v.type,
          montant: v.montant,
          date: v.date,
          idvoiture: v.idvoiture,
        }));
        console.log(formatted);

        setDepense(formatted);
      } catch (error) {
        console.error("Erreur lors de la récupération des depense :", error);
      }
    };

    fetchDepenses();
  }, []);

  return (
    <div>
      <NavBarPage />
      <Crud
        titre="Liste des depenses"
        headers={[
          { key: "id", label: "ID" },
          { key: "type", label: "Type" },
          { key: "date", label: "Date" },
          { key: "montant", label: "Montant depenser" },
          { key: "idvoiture", label: "Id du voiture" },
        ]}
        data={Depense}
        onDataChange={async (id, newData) => {
          try {
            if (newData === null) {
              await DeleteDepense(id);
            } else {
              // Transformation des données dans le format attendu par l'API
              const trajetPayload = {
                type: newData.type,
                date: newData.date,
                montant: parseInt(newData.montant),
                idvoiture: parseInt(newData.idvoiture),
              };

              if (id === null) {
                console.log("ty le id anlery lty eee:", trajetPayload);
                await AjouterDepense(trajetPayload);
              } else {
                await UpdateDepense(id, trajetPayload);
              }
            }

            // Recharge des données
            const response = await GetDepense();
            const data = response.data.data;
            const formatted = data.map((v) => ({
              id: v.iddepense,
              type: v.type,
              montant: v.montant,
              date: v.date,
              idvoiture: v.idvoiture,
            }));
            setDepense(formatted);
          } catch (error) {
            console.error("Erreur lors de l'opération CRUD :", error);
          }
        }}
        onDelete={async (id) => {
          try {
            await DeleteDepense(id); // appelle ton service API
            // Recharge les données après suppression
            const response = await GetDepense();
            const data = response.data.data;
            const formatted = data.map((v) => ({
              id: v.iddepense,
              type: v.type,
              montant: v.montant,
              date: v.date,
              idvoiture: v.idvoiture,
            }));
            GetDepense(formatted);
          } catch (error) {
            console.error("Erreur lors de la suppression :", error);
          }
        }}
      />
    </div>
  );
}

export default Depense;
