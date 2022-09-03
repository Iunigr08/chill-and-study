<template>
  <div class="login-layout">
    <div class="header">
      <TheGlobalHeader />
    </div>
    <div class="login-main">
      <div class="back-btn">
        <router-link to="/" class="back-btn--router">
          <i class="ri-arrow-go-back-line"></i>
          <span class="router-text">Home</span>
        </router-link>
      </div>
      <div class="login-form">
        <div v-if="this.$route.path === '/login'" class="message">
          <span>ちるスタ</span>へのログイン
        </div>
        <div v-else class="message"><span>ちるスタ</span>アカウントの作成</div>
        <router-view></router-view>
        <div class="switch-router">
          <router-link
            v-if="this.$route.path === '/login'"
            :to="{ name: 'SignupForm' }"
          >
            新規登録はこちら
          </router-link>
          <router-link v-else :to="{ name: 'SigninForm' }">
            アカウントをお持ちの方はこちら
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheGlobalHeader from "../components/TheGlobalHeader.vue"

export default {
  name: "LoginView",
  components: {
    TheGlobalHeader,
  },
  created: function () {
    console.log("loginview")
    // if (this.$store.state.loginStatus) {
    //   this.$route.query.redirect
    //     ? this.$router.push(this.$route.query.redirect)
    //     : this.$router.push("/")
    // }
    // this.$store.dispatch("syncLoginRedirect")
  },
}
</script>

<style scoped>
.login-layout {
  color: var(--text-default-green);
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 5rem 1fr;
}
.header {
  height: 5rem;
  grid-row: 1/2;
  grid-column: 1/2;
}
.login-main {
  grid-row: 2/3;
  grid-column: 1/2;
  width: 60rem;
  height: 100%;
  margin: 0 auto;
  overflow-y: scroll;
}
.back-btn {
  color: var(--text-default-green);
  margin: 3rem 0;
}
.back-btn--router {
  display: block;
  position: relative;
  width: 10rem;
  /* padding: 0 3rem; */
  height: 100%;
}
.router-text {
  position: absolute;
  top: 50%;
  transform: translateY(-60%);
  color: var(--text-default-green);
  font-size: 1.6rem;
  font-weight: bold;
  padding-left: 1.2rem;
}
.back-btn--router:hover i,
.back-btn--router:hover .router-text {
  color: var(--text-deep-green);
}
.login-form {
  width: 70%;
  min-width: 40rem;
  /* height: 100%; */
  margin: 0 auto;
  /* margin: 20rem auto 0 auto; */
}
.message {
  width: auto;
  color: var(--text-default-green);
  font-size: 2rem;
  margin: 20rem auto 13rem auto;
  margin-top: 8rem;
  text-align: center;
}
.message span {
  font-weight: bold;
}
.back-btn i {
  color: var(--text-default-green);
  font-size: 2.4rem;
}
.switch-router {
  margin-top: 5rem;
  margin-bottom: 5rem;
}
.switch-router a {
  color: var(--text-a-link);
  font-size: 1.4rem;
}
.switch-router a:hover {
  text-decoration: underline;
}
</style>
