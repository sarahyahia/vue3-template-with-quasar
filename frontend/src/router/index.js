import { createWebHistory, createRouter } from "vue-router";
import moment from "moment";
import i18n from "@/plugins/i18n";
import store from "@/store/index";


import Register from "@/views/Auth/Register.vue";
import Home from "@/views/Home.vue";
import NotFound from "@/views/Errors/404.vue";

i18n.locale = localStorage.locale; //set the localization

const isAuthenticated = () => {
  const token = localStorage.token;
  const expiresAt = localStorage.expiresAt;
  return !!token && expiresAt > moment.utc().valueOf();
};

const ifNotAuthenticated = (to, from, next) => {
  if (isAuthenticated()) {
    window.location.href = "/cp";
    return;
  }
  if (to.fullPath === "/") {
    next({ path: "/login" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    component: Home,
    beforeEnter: ifNotAuthenticated,
    children: [
      {
        path: "register",
        name: "Register",
        component: Register,
      },
    ],
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;