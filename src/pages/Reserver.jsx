import { useState } from "react";
import NavBar from "../components/navBar";
import ReserverComp from "../components/reserverComp";
import Payement from "../components/payement";

function Reserver() {
  const [showPayment, setShowPayment] = useState(false);
     const [reservationData, setReservationData] = useState({
       placesCount: 0,
       totalPrice: 0,
     });

  return (
    <div>
      <NavBar />
      <ReserverComp
        setShowPayment={setShowPayment}
        setReservationData={setReservationData}
      />
      {showPayment && (
        <Payement
          setShowPayment={setShowPayment}
          placesCount={reservationData.placesCount}
          totalPrice={reservationData.totalPrice}
        />
      )}
    </div>
  );
}

export default Reserver;
