import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import { Environment } from "./env/Environment";
import { AppConfig } from "./configs/AppConfig";
import router from "./router";
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.mount("#app");

AppConfig.getInstance(Environment.getCurrent());

console.log(
  `${AppConfig.getInstance().appEnvironment}`,
  AppConfig.getInstance().apiBaseUrl
);
