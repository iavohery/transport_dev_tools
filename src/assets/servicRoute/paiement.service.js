import Api from "../axios/axios";

const GetPaiement = () => Api.get("api/getAllPaiement/");

const UpdatePaiement = (id, data) => Api.put(`api/updatePaiement/${id}`, data);

const DeletePaiement = (id) => Api.delete(`api/deletePaiement/${id}`);

const AjouterPaiement = (data) => Api.post(`api/createPaiement/`, data);

export { GetPaiement, UpdatePaiement, DeletePaiement, AjouterPaiement };
