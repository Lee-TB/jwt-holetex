import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MainLayout from "../layouts/MainLayout.VUE";

import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: MainLayout,
      meta: { requiresAuth: true },
      children: [
        {
          name: "home",
          path: "",
          component: HomeView,
        },
        {
          name: "book",
          path: "books",
          component: () => import("../views/BookView.vue"),
        },
      ],
    },
    {
      name: "auth",
      path: "/auth",
      redirect: "/auth/login",
      component: () => import("../layouts/AuthLayout.vue"),
      children: [
        {
          name: "login",
          path: "login",
          component: () => import("../views/auth/LoginView.vue"),
        },
        {
          name: "register",
          path: "register",
          component: () => import("../views/auth/RegisterView.vue"),
        },
      ],
    },
    {
      path: "/login",
      redirect: "/auth/login",
    },
    {
      path: "/register",
      redirect: "/auth/register",
    },
  ],
});

// This is global navigation guard https://router.vuejs.org/guide/advanced/navigation-guards.html#Global-Before-Guards
router.beforeEach(async (to, from) => {
  const userStore = useUserStore();
  const { isLoggedIn } = storeToRefs(userStore);
  if (
    !isLoggedIn.value &&
    // Make sure the route is being accessed with the required authentication
    to.meta.requiresAuth
  ) {
    // redirect the user to the login page
    return { name: "login" };
  }
});

export default router;
