import { createRouter, createWebHashHistory } from "vue-router"
import CountDownTimer from "../views/CountDownTimer.vue"
import store from "@/store/index"

const routes = [
  {
    path: "/",
    component: CountDownTimer,
    children: [
      {
        path: "",
        name: "TimerScreen",
        component: () => import("../components/Timer/TimerScreen.vue"),
      },
      {
        path: "/timerset",
        name: "TimerSetting",
        component: () => import("../components/Timer/TimerSetting.vue"),
      },
    ],
  },
  {
    path: "/clock",
    name: "ClockTime",
    component: () => import("../views/ClockTime.vue"),
  },
  {
    path: "/dashboard",
    name: "DashBoard",
    component: () => import("../views/DashBoard.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/login",
    // name: "LoginView",
    component: () => import("../views/LoginView.vue"),
    children: [
      {
        path: "",
        name: "SigninForm",
        component: () => import("../components/Login/SigninForm.vue"),
      },
      {
        path: "signup",
        name: "SignupForm",
        component: () => import("../components/Login/SignupForm.vue"),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    // if (!store.dispatch("syncGetLoginStatus")) {
    if (!store.state.loginStatus) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
