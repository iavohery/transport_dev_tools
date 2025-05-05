import { useState, useEffect } from "react";
import "../css/dashboard.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("chiffre-affaire");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["chiffre-affaire", "depenses", "benefice", "trajet"];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const threshold = 100;
          if (rect.top <= threshold && rect.bottom >= threshold) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView();
      // behavior: "smooth";
    }
  };

  return (
    <div className="dash">
      <div className="btn_dash">
        <button
          onClick={() => scrollToSection("chiffre-affaire")}
          className={activeSection === "chiffre-affaire" ? "active" : ""}
        >
          <i className="fas fa-chart-bar"></i>
          <span>Chiffre d'affaire</span>
          <div id="rond_dash"></div>
        </button>
        <button
          onClick={() => scrollToSection("depenses")}
          className={activeSection === "depenses" ? "active" : ""}
        >
          <i className="fa fa-money-bill-wave"></i>
          <span>Dépenses</span>
          <div id="rond_dash"></div>
        </button>
        <button
          onClick={() => scrollToSection("benefice")}
          className={activeSection === "benefice" ? "active" : ""}
        >
          <i className="fa fa-coins"></i>
          <span>Bénéfice net</span>
          <div id="rond_dash"></div>
        </button>
        <button
          onClick={() => scrollToSection("trajet")}
          className={activeSection === "trajet" ? "active" : ""}
        >
          <i className="fa fa-road"></i>
          <span>Trajet effectué</span>
          <div id="rond_dash"></div>
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
