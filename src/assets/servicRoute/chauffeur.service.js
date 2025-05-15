import Api from "../axios/axios";

const GetChauffeur = () => Api.get("api/getAllChauffeur/");

export {GetChauffeur}