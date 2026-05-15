import DashboardView from "@/views/my_assets/DashboardView.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/dashboard",
    component: DashboardView,
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", redirect: "/dashboard" },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
