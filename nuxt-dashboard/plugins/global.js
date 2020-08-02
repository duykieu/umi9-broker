import Vue from "vue";
import Vuelidate from "vuelidate";
import { notification, Modal } from "ant-design-vue";
import { IconsPlugin } from "bootstrap-vue";

const { confirm } = Modal;

Vue.use(Modal);

Vue.use(IconsPlugin);

Vue.use(Vuelidate);

Vue.prototype.$notification = (type, description, message, placement) => {
    notification[type]({
        message: message || "Thông báo",
        placement: placement || "bottomRight",
        description,
    });
};

Vue.prototype.dateFormat = "DD/MM/YYYY";

Vue.prototype.$confirm = confirm;

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

Vue.directive("click-outside", {
    bind(el, binding, vnode) {
        el.eventSetDrag = function () {
            el.setAttribute("data-dragging", "yes");
        };
        el.eventClearDrag = function () {
            el.removeAttribute("data-dragging");
        };
        el.eventOnClick = function (event) {
            const dragging = el.getAttribute("data-dragging");
            // Check that the click was outside the el and its children, and wasn't a drag
            // eslint-disable-next-line eqeqeq
            if (!(el == event.target || el.contains(event.target)) && !dragging) {
                // call method provided in attribute value
                vnode.context[binding.expression](event);
            }
        };
        document.addEventListener("touchstart", el.eventClearDrag);
        document.addEventListener("touchmove", el.eventSetDrag);
        document.addEventListener("click", el.eventOnClick);
        document.addEventListener("touchend", el.eventOnClick);
    },
    unbind(el) {
        document.removeEventListener("touchstart", el.eventClearDrag);
        document.removeEventListener("touchmove", el.eventSetDrag);
        document.removeEventListener("click", el.eventOnClick);
        document.removeEventListener("touchend", el.eventOnClick);
        el.removeAttribute("data-dragging");
    },
});
