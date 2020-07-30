import axios from "axios";

const PropertyService = {
  get: (data = {}) => axios.get("/property", { params: data }),
  store: data => axios.post("/property", data),
  update: data => axios.patch("/property/" + data._id, data),
  show: id => axios.get("/property/" + id),
  destroy: id => axios.delete("/property/" + id),
};

export default PropertyService;
