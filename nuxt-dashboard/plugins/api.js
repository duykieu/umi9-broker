import Vue from "vue";

export default function ({ $axios }) {
    Vue.prototype.$api = {
        Auth: {
            Login: data => $axios.post("/login", data),
        },
        User: {
            Get: params => $axios.get("/user", { params }),
        },
    };
}
