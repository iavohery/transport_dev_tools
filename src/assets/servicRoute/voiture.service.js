import Api from "../axios/axios";

const GetVoiture = () => Api.get("api/getAllVoiture/");

const UpdateVoiture = (id, data) => Api.put(`api/updateVoiture/${id}`, data);

const DeleteVoiture = (id) => Api.delete(`api/deleteVoiture/${id}`);

const AjouterVoiture = (data) => Api.post(`api/createVoiture/`, data);

export { GetVoiture, UpdateVoiture, DeleteVoiture, AjouterVoiture };
