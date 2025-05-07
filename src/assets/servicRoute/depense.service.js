import Api from "../axios/axios";

const GetDepense = () => Api.get("api/getAllDepense/");

const UpdateDepense = (id, data) => Api.put(`api/updateDepense/${id}`, data);

const DeleteDepense = (id) => Api.delete(`api/deleteDepense/${id}`);

const AjouterDepense = (data) => Api.post(`api/createDepense/`, data);

export { GetDepense, UpdateDepense, DeleteDepense, AjouterDepense };
