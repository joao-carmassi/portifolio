import HomePage from "@/view/HomePage.vue";
import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";

const rotas: RouteRecordRaw[] = [
  {
    path: "/",
    component: HomePage,
  },
];

const roteador = createRouter({
  history: createWebHashHistory(),
  routes: rotas,
});

export default roteador;
