// Entry point: sets up Vue app and routes
import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";

// Import route components
import ParentComponent from "./components/ParentComponent.vue";
import LifecycleDemo from "./components/LifecycleDemo.vue";
import DirectiveDemo from "./components/DirectiveDemo.vue";
import FeedbackForm from "./components/FeedbackForm.vue";

const Welcome = {
  template: "<p>Select a topic from the navigation above.</p>",
};
// Define routes
const routes = [
  //   { path: "/", component: Welcome },
  { path: "/parent-child", component: ParentComponent },
  { path: "/lifecycle", component: LifecycleDemo },
  { path: "/directives", component: DirectiveDemo },
  { path: "/feedback", component: FeedbackForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
