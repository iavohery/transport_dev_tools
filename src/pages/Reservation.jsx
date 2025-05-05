import { useState } from "react";
import Crud from "../components/crud";
import NavBarPage from "../components/navBarPage";

function Reservation() {

  const [reservations, setReservations] = useState([
    {
      id: 1,
      date: "11/11/11",
      nom: "toky",
      numero: "032 07 940 01",
      place: "2",
    },
    {
      id: 2,
      date: "11/12/11",
      nom: "belou",
      numero: "032 03 920 01",
      place: "2",
    },
  ]);

  return (
    <div>
      <NavBarPage />
      <Crud
        titre="reservation"
        headers={["Date", "Nom", "Numero", "place"]}
        data={reservations}
      />
    </div>
  );
}

export default Reservation;
