import { useEffect, useState } from "react";
import Crud from "../components/crud";
import NavBarPage from "../components/navBarPage";
import {
  AjouterEmployee,
  DeleteEmployee,
  GetEmployee,
  UpdateEmployee,
} from "../assets/servicRoute/employee.service";

function Employee() {
  const [Employee, setEmployee] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await GetEmployee();
        const data = response.data.data;

        const formatted = data.map((v) => ({
          id: v.idemploye,
          salaire: v.salaire,
          date_embauche: v.date_embauche,
          iduser: v.iduser,
          idposte: v.idposte,
        }));
        console.log(formatted);

        setEmployee(formatted);
      } catch (error) {
        console.error("Erreur lors de la récupération des employees :", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      <NavBarPage />
      <Crud
        titre="Liste des employees"
        headers={[
          { key: "id", label: "ID" },
          { key: "salaire", label: "Salaire" },
          { key: "date_embauche", label: "Date d'Embauche" },
          { key: "iduser", label: "Nom" },
          { key: "idposte", label: "Poste" },
        ]}
        data={Employee}
        onDataChange={async (id, newData) => {
          try {
            if (newData === null) {
              await DeleteEmployee(id);
            } else {
              // Transformation des données dans le format attendu par l'API
              const trajetPayload = {
                salaire: parseInt(newData.salaire),
                date_embauche: newData.date_embauche,
                iduser: parseInt(newData.iduser),
                idposte: parseInt(newData.idposte),
              };

              if (id === null) {
                await AjouterEmployee(trajetPayload);
              } else {
                await UpdateEmployee(id, trajetPayload);
              }
            }

            // Recharge des données
            const response = await GetEmployee();
            const data = response.data.data;
            const formatted = data.map((v) => ({
              id: v.idemploye,
              salaire: v.salaire,
              date_embauche: v.date_embauche,
              iduser: v.iduser,
              idposte: v.idposte,
            }));
            setEmployee(formatted);
          } catch (error) {
            console.error("Erreur lors de l'opération CRUD :", error);
          }
        }}
        onDelete={async (id) => {
          try {
            await DeleteEmployee(id); // appelle ton service API
            // Recharge les données après suppression
            const response = await GetEmployee();
            const data = response.data.data;
            const formatted = data.map((v) => ({
              id: v.idemploye,
              salaire: v.salaire,
              date_embauche: v.date_embauche,
              iduser: v.iduser,
              idposte: v.idposte,
            }));
            setEmployee(formatted);
          } catch (error) {
            console.error("Erreur lors de la suppression :", error);
          }
        }}
      />
    </div>
  );
}

export default Employee;
