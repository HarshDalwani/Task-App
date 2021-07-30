import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import store from "./store";
import cookie from "js-cookie";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    const user = cookie.get("user");
    if (user != undefined) this.$store.commit("SETUSER", JSON.parse(user));
  },
  render: (h) => h(App),
}).$mount("#app");
