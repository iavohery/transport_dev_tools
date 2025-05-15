import Api from "../axios/axios";

const GetPlaceOccuper = (data) =>
  Api.post("api/getVoituresAvecPlacesOccupees/", data);

export { GetPlaceOccuper };
