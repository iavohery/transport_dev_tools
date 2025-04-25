const express = require("express");
const router = express.Router();

const utilisateur = require("../Controler/utilisateur");

router.post("/createUtilisateur/",utilisateur.createUtilisateur);
router.put("/updateUtilisateur/:id",utilisateur.updateUtilisateur);
router.delete("/deleteUtilisateur/:id",utilisateur.deleteUtilisateur);
router.get("/getAllUser/",utilisateur.getAllUtilisateur);
router.get("/rechercheUser/:id",utilisateur.getUtilisateurById);

module.exports = router;