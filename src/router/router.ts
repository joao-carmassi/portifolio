import HomePage from "@/view/HomePage.vue";
import { createMemoryHistory, createRouter } from "vue-router";

const routes = [{ path: "/", component: HomePage }];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
