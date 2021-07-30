import Vue from "vue";
import VueRouter from "vue-router";
import cookie from "js-cookie";
import Task from "../views/Task.vue";
import Auth from "../views/Auth.vue";

Vue.use(VueRouter);

function User() {
  const user = cookie.get("user");
  if (user == undefined) return false;
  else return true;
}

const routes = [
  {
    path: "/tasks",
    name: "Task",
    component: Task,
    beforeEnter: (to, from, next) => {
      if (User()) next();
      else next({ name: "Auth" });
    },
  },
  {
    path: "/",
    name: "Auth",
    component: Auth,
    beforeEnter: (to, from, next) => {
      if (User() && to.name == "Auth") next({ name: "Task" })
      else next()
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
