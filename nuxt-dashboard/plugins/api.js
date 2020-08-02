import Vue from "vue";

export default function ({ $axios }) {
    Vue.prototype.$api = {
        Auth: {
            Login: data => $axios.post("/login", data),
            fetchPermissions: () => $axios.get("/permissions"),
        },
        User: {
            Get: params => $axios.get("/user", { params }),
            Store: data => $axios.post("/user", { data }),
            Update: (id, data) => $axios.patch("/user/" + id, { data }),
            Show: id => $axios.get("/user/" + id),
            Delete: id => $axios.delete("/user/" + id),
        },
        User_Group: {
            Get: params => $axios.get("/user-groups", { params }),
            Store: data => $axios.post("/user-groups", { data }),
            Update: (id, data) => $axios.patch("/user-groups/" + id, { data }),
            Show: id => $axios.get("/user-groups/" + id),
            Delete: id => $axios.delete("/user-groups/" + id),
        },
    };
}
