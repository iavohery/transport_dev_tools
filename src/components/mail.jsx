import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/mail.css";
import transLogo from "../assets/transLogo.png";

function Mail({ setShowMail }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMail(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [setShowMail]);

  return (
    <div className="mail">
      <div className="mail1">
        <img id="img_mail" src={transLogo} alt="" />
        <h2 id="h2_mail">Vous allez recevoir un mail de confirmation</h2>
        <p id="p_mail">Envoi du mail en cours ...</p>
        <div className="loading"></div>
      </div>
    </div>
  );
}

export default Mail;
