import MyAssetsView from "@/views/my_assets/MyAssetsView.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/my-assets",
    component: MyAssetsView,
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", redirect: "/my-assets" },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
