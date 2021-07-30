import Vue from "vue";
import Vuex from "vuex";
import cookie from "js-cookie";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    SETUSER(state, payload) {
      state.user = payload;
      cookie.set("user", JSON.stringify(payload));
    },
    LOGOUT_USER(state) {
      state.user = null;
      cookie.remove("user");
    },
  },
  getters: {
    isUserAuthenticated(state) {
      return !!state.user;
    },
    user(state) {
      return state.user;
    },
  },
});

export default store;
