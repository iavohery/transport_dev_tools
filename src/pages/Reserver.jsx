import { useState, useEffect } from "react";
import NavBar from "../components/navBar";
import ReserverComp from "../components/reserverComp";
import Payement from "../components/payement";
import Mail from "../components/mail";

function Reserver() {
  const [showPayment, setShowPayment] = useState(false);
  const [showMail, setShowMail] = useState(false); // ← Nouveau state
  const [reservationData, setReservationData] = useState({
    placesCount: 0,
    totalPrice: 0,
  });
  const [globalSelections, setGlobalSelections] = useState([]);
  const [refreshFn, setRefreshFn] = useState(() => () => {});

  // Suivre les changements de showPayment
  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setShowMail(true);
  };

  return (
    <div>
      <NavBar />
      <ReserverComp
        setShowPayment={setShowPayment}
        setReservationData={setReservationData}
        setGlobalSelections={setGlobalSelections}
        setRefreshFn={setRefreshFn}
      />
      {showPayment && (
        <Payement
          setShowPayment={setShowPayment}
          placesCount={reservationData.placesCount}
          totalPrice={reservationData.totalPrice}
          globalSelections={globalSelections}
          refreshVoitures={refreshFn}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
      {showMail && <Mail setShowMail={setShowMail} />}
    </div>
  );
}

export default Reserver;
