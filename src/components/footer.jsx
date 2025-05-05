import "../css/footer.css";
import { Link, useLocation } from "react-router-dom";
import fontLog from "../assets/fontLog.jpg";
import "font-awesome/css/font-awesome.min.css";
import { useState, useEffect } from "react";

function Footer() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 30;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <div className="footer">
      {/* <div className={`footer_2 ${scrolled ? "scrolled" : ""}`}>
        <div className="titrefoot">
          <h3>Payement accépté</h3>
        </div>
        <div className="corpfoot">
          <div className="corpfoot1">
            <i className="fa fa-facebook"></i>
            <div className="droite">
              <h3>Facebook</h3>
              <p>zefuhzepfhez</p>
            </div>
          </div>
        </div>
      </div> */}
      <div className={`footer_2 ${scrolled ? "scrolled" : ""}`}>
        <div className="titrefoot">
          <h3>Contactez nous</h3>
        </div>
        <div className="corpfoot">
          <div className="corpfoot1">
            <i className="fa fa-phone"></i>
            <div className="droite">
              <h3>Télephone</h3>
              <p>032 07 940 01</p>
            </div>
          </div>
          <div className="corpfoot1">
            <i className="fab fa-facebook"></i>
            <div className="droite">
              <h3>Facebook</h3>
              <p>Trans-Rapide</p>
            </div>
          </div>
          <div className="corpfoot1">
            <i className="fab fa-instagram"></i>
            <div className="droite">
              <h3>Instagram</h3>
              <p>Trans-Rapide</p>
            </div>
          </div>
          <div className="corpfoot1">
            <i className="fab fa-whatsapp"></i>
            <div className="droite">
              <h3>WhatsApp</h3>
              <p>032 07 940 01</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
