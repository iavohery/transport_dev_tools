import Api from "../axios/axios";

const GetEmployee = () => Api.get("api/getAllEmploye/");

const UpdateEmployee = (id, data) => Api.put(`api/updatEmploye/${id}`, data);

const DeleteEmployee = (id) => Api.delete(`api/deleteEmploye/${id}`);

const AjouterEmployee = (data) => Api.post(`api/createEmploye/`, data);

export { GetEmployee, UpdateEmployee, DeleteEmployee, AjouterEmployee };
