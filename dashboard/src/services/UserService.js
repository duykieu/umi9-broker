import axios from "axios";

const UserService = {
  get: (data = {}) => axios.get("/user", { params: data }),
  store: (data) => axios.post("/user", data),
  update: (data) => axios.patch("/user/" + data._id, data),
  show: (id) => axios.get("/user/" + id),
  destroy: (id) => axios.delete("/user/" + id),
};

export default UserService;
