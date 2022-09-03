<template>
  <div class="login-layout">
    <div class="back-btn">
      <button><i class="ri-arrow-go-back-fill"></i></button>
    </div>
    <slot></slot>
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
</template>

<script>
export default {
  data: function () {
    return {}
  },
  created: function () {},
  mounted: function () {
    // if (this.$store.state.loginStatus) {
    //   this.$route.query.redirect
    //     ? this.$router.push(this.$route.query.redirect)
    //     : this.$router.push("/")
    // }
  },
}
</script>

<style scoped></style>
