import Api from "../axios/axios";

const GetPoste = () => Api.get("api/getAllPoste/");

const UpdatePoste = (id, data) => Api.put(`api/updatePoste/${id}`, data);

const DeletePoste = (id) => Api.delete(`api/deletePoste/${id}`);

const AjouterPoste = (data) => Api.post(`api/createPoste/`, data);

export { GetPoste, UpdatePoste, DeletePoste, AjouterPoste };
