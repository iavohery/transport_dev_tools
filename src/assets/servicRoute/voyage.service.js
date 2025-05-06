import Api from "../axios/axios";

const GetVoyage = () => Api.get("api/getAllVoyage/");

const UpdateVoyage = (id, data) => Api.put(`api/updateVoyage/${id}`, data);

const DeleteVoyage = (id) => Api.delete(`api/deleteVoyage/${id}`);

const AjouterVoyage = (data) => Api.post(`api/createVoyage/`, data);

export { GetVoyage, UpdateVoyage, DeleteVoyage, AjouterVoyage };
