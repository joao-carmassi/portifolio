import "./assets/style.css";

import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router/router";

createApp(App).use(router).use(createPinia()).mount("#app");
