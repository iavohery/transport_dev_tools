import Api from "../axios/axios";

const GetVoiture = () => Api.get("api/getAllVoiture/");

export default GetVoiture;
