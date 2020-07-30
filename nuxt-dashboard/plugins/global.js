import Vue from "vue";
import Vuelidate from "vuelidate";
import { notification } from "ant-design-vue";
import { IconsPlugin } from "bootstrap-vue";

Vue.use(IconsPlugin);

Vue.use(Vuelidate);

Vue.prototype.$notification = (type, description, message, placement) => {
    notification[type]({
        message: message || "Thông báo",
        placement: placement || "bottomRight",
        description,
    });
};

Vue.$log = (...items) => {
    items.forEach(el => {
        console.log(el);
    });
};

Vue.directive("out", {
    bind: function (el, binding, vNode) {
        const handler = e => {
            if (!el.contains(e.target) && el !== e.target) {
                // and here is you toggle var. thats it
                vNode.context[binding.expression] = false;
            }
        };
        el.out = handler;
        document.addEventListener("click", handler);
    },

    unbind: function (el, binding) {
        document.removeEventListener("click", el.out);
        el.out = null;
    },
});
