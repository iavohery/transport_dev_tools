import Api from "../axios/axios";

const GetUtilisateur = () => Api.get("api/getAllUser/");

const GetIdByPassWord = (data) => Api.post("api/getIdByPassWord/", data);

const UpdateUtilisateur = (id, data) =>
  Api.put(`api/updateUtilisateur/${id}`, data);

const DeleteUtilisateur = (id) => Api.delete(`api/deleteUtilisateur/${id}`);

const AjouterUtilisateur = (data) => Api.post(`api/createUtilisateur/`, data);

export {
  GetUtilisateur,
  UpdateUtilisateur,
  DeleteUtilisateur,
  AjouterUtilisateur,
  GetIdByPassWord,
};
