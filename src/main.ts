import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { createPinia } from "pinia";
import VueApexCharts from "vue3-apexcharts";

loadFonts();

const app = createApp(App);

app
  .use(router)
  .use(createPinia())
  .use(VueApexCharts)
  .use(vuetify)
  .mount("#app");
