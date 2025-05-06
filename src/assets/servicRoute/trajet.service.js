import Api from "../axios/axios";

const GetTrajet = () => Api.get("api/getAllTrajet/");

const UpdateTrajet = (id, data) => Api.put(`api/updateTrajet/${id}`, data);

const DeleteTrajet = (id) => Api.delete(`api/deleteTrajet/${id}`);

const AjouterTrajet = (data) => Api.post(`api/createTrajet/`, data);

export { GetTrajet, UpdateTrajet, DeleteTrajet, AjouterTrajet };
