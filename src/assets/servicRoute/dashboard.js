import Api from "../axios/axios";

const PaiementsParJour = () => Api.get("api/PaiementsParJour/");

const DepensesParJour = () => Api.get("api/DepensesParJour/");

const VoyagesParJour = () => Api.get("api/VoyagesParJour/");

export { PaiementsParJour, DepensesParJour, VoyagesParJour };
