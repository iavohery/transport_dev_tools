import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "../pages/Acceuil";
import Reserver from "../pages/Reserver";
import Destination from "../pages/Destination";
import Admin from "../pages/Admin";
import AdminPage from "../pages/AdminPage";
import Reservation from "../pages/Reservation";
import Utilisateur from "../pages/Utilisateur";
import Chauffeur from "../pages/Chauffeur";
import Voitures from "../pages/Voitures";
import Employe from "../pages/Employe";
import Trajet from "../pages/Trajet";
import Recette from "../pages/Recette";
import Poste from "../pages/poste";
import Voyage from "../pages/voyage";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/Reserver" element={<Reserver />} />
        <Route path="/Destination" element={<Destination />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/AdminPage" element={<AdminPage />} />
        <Route path="/Reservation" element={<Reservation />} />
        <Route path="/Utilisateur" element={<Utilisateur />} />
        <Route path="/Chauffeur" element={<Chauffeur />} />
        <Route path="/Voitures" element={<Voitures />} />
        <Route path="/Employe" element={<Employe />} />
        <Route path="/Trajet" element={<Trajet />} />
        <Route path="/Recette" element={<Recette />} />
        <Route path="/Poste" element={<Poste />} />
        <Route path="/Voyage" element={<Voyage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
