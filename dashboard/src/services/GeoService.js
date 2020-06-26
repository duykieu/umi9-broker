import axios from "axios";

const GeoService = {
  fetchStates: () => {
    return axios.get(process.env.REACT_APP_GEO_API + "/state", {
      mode: "no-cors",
    });
  },
  fetchCities: (stateCode) => {
    return axios.get(process.env.REACT_APP_GEO_API + "/city/" + stateCode);
  },
  fetchWards: (cityId) => {
    return axios.get(process.env.REACT_APP_GEO_API + "/ward/" + cityId);
  },
  fetchStreets: (cityId) => {
    return axios.get(process.env.REACT_APP_GEO_API + "/street/" + cityId);
  },
};

export default GeoService;
