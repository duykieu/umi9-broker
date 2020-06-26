import axios from "axios";

const CategoryService = {
  get: () => axios.get("/category"),
  store: (data) => axios.post("/category", data),
  update: (data) => axios.patch("/category/" + data._id, data),
  show: (id) => axios.get("/category/" + id),
  destroy: (id) => axios.delete("/category/" + id),
};

export default CategoryService;
