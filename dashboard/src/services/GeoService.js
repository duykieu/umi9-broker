import axios from "axios";

const GeoService = {
  fetchStates: () => {
    return axios.get(process.env.REACT_APP_MAIN_API + "/state");
  },
  fetchCities: (stateId) => {
    return axios.get(process.env.REACT_APP_MAIN_API + "/city/" + stateId);
  },
  fetchWards: ({ stateId, cityId }) => {
    return axios.get(
      process.env.REACT_APP_MAIN_API + "/ward/" + stateId + "/" + cityId
    );
  },
  fetchStreets: ({ stateId, cityId }) => {
    return axios.get(
      process.env.REACT_APP_MAIN_API + "/street/" + stateId + "/" + cityId
    );
  },
};

export default GeoService;
