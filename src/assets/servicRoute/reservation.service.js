import Api from "../axios/axios";

const AjouterReservation = (data) =>
  Api.post("api/postReservationPlace/", data);

export { AjouterReservation };
