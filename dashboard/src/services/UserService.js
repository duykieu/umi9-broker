import axios from "axios";

const UserService = {
  get: () => axios.get("/user"),
  store: (data) => axios.post("/user", data),
  update: (data) => axios.patch("/user/" + data._id, data),
  show: (id) => axios.get("/user/" + id),
  destroy: (id) => axios.delete("/user/" + id),
};

export default UserService;
