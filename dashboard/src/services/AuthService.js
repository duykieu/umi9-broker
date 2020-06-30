import Axios from "axios";

export default {
  login: (data) => Axios.post("/login", data),
  logout: (data) => Axios.get("/logout", data),
  signup: (data) => Axios.post("/signup", data),
};
