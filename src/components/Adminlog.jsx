import { useState } from "react";
import "../css/loginAdmin.css";
import { Link, useLocation } from "react-router-dom";
import fontLog from "../assets/fontLog.jpg";
import { GetIdByPassWord } from "../assets/servicRoute/user.service";
import { useNavigate } from "react-router-dom";

function Adminlog() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const getIdByPassWordUser = async (username, password) => {
    return await GetIdByPassWord({ username, password });
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // pour ne pas recharger la page

    try {
      const response = await getIdByPassWordUser(username, password);
      if (response.data.data != null) {
        // ou une autre condition selon ta réponse
        navigate("/AdminPage");
      } else {
        alert("Nom d'utilisateur ou mot de passe incorrect.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      alert("Erreur serveur ou identifiants invalides.");
    }
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
        <form action="" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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

          <button type="submit">
            Continuer <i className="fa fa-arrow-right"></i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Adminlog;
