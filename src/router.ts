import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Content from "@/pages/content/Content";
import Editor from "@/pages/editor/Editor";

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/content/:id",
      component: Content
    },
    {
      path: "/editor/:id",
      component: Editor
    }
  ]
});
