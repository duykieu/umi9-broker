import axios from "axios";

const PriceModelService = {
  get: () => axios.get("/priceModel"),
  store: (data) => axios.post("/priceModel", data),
  update: (data) => axios.patch("/priceModel/" + data._id, data),
  show: (id) => axios.get("/priceModel/" + id),
  destroy: (id) => axios.delete("/priceModel/" + id),
};

export default PriceModelService;
