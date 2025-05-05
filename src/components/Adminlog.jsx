import { useState } from "react";
import "../css/loginAdmin.css";
import { Link, useLocation } from "react-router-dom";
import fontLog from "../assets/fontLog.jpg";

function Adminlog() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="centre">
      <div className="centre1" id="centre1">
        <img src={fontLog} alt="" />
      </div>
      <div className="centre1" id="centre2">
        <i className="fa fa-lock"></i>
        <h2>Admin</h2>
        <p>Se connecter pour continuer d'accéder à la page</p>
        <form action="">
          <input type="text" placeholder="Nom d'utilisateur" />
          <br />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            value={password}
            onChange={handlePasswordChange}
          />
          <br />
          {password && (
            <i
              id="eye"
              className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              onClick={togglePasswordVisibility}
            ></i>
          )}
          <Link to="/AdminPage">
            <button>
              Continuer <i className="fa fa-arrow-right"></i>
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Adminlog;
