<template>
  <div class="global-header">
    <div class="logo">
      <router-link to="/" class="logo--router">
        <img src="../assets/title_logo5.svg" alt="CS" class="logo--img" />
        <p class="logo--text">ちるスタ</p>
      </router-link>
    </div>
    <div class="login-logout">
      <router-link v-if="!loginStatus" to="/login" exact class="router-a">
        <span class="router-a--icon">
          <i class="ri-login-box-line"></i>
        </span>
        <span class="router-a--title">ログイン</span>
      </router-link>
      <router-link v-else to="/" @click="logout" exact class="router-a">
        <span class="router-a--icon">
          <i class="ri-logout-box-line"></i>
        </span>
        <span class="router-a--title title--login">ログアウト</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { auth } from "../main"
import { signOut } from "firebase/auth"

export default {
  data: function () {
    return {}
  },
  computed: {
    loginStatus: {
      get() {
        return this.$store.getters["loginStatus"]
      },
    },
  },
  methods: {
    logout: function () {
      signOut(auth)
        .then(() => {
          this.$store.commit("deleteUser")
          this.$store.commit("setLoginStatus", false)
          this.$store.commit("setLoadedFlg", false)
        })
        .then(() => {
          if (this.$route.meta.requireAuth) {
            this.$router.push({
              path: "/login",
              query: { redirect: this.$route.fullPath },
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style scoped>
.global-header {
  height: 5rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--bg-gray);
}
.logo {
  width: 20rem;
  height: 100%;
}
.logo--router {
  display: block;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.logo--img {
  width: 3.2rem;
  height: 3.2rem;
  margin-left: 1.2rem;
}
.logo--text {
  color: var(--text-deep-green);
  font-size: 1.7rem;
  font-weight: bold;
  margin-left: 1.5rem;
  /* transform: translateY(0.6rem); */
}
.login-logout {
  margin-right: 3rem;
}
.router-a {
  display: block;
  height: 100%;
  /* width: 12rem; */
  min-width: 12rem;
  position: relative;
  color: var(--text-light-green);
  transition: 0.2s;
}
.router-a:hover {
  color: var(--text-deep-green);
  background-color: var(--bg-light-gray);
  border-radius: 0.8rem;
}
span.router-a--icon {
  font-size: 2.4rem;
  position: absolute;
  height: 4.2rem;
  padding-left: 2rem;
  transform: translateY(0.9rem);
}
span.router-a--title {
  position: absolute;
  top: 50%;
  transform: translateY(-60%);
  padding-left: 5rem;
  font-size: 1.2rem;
}
</style>
