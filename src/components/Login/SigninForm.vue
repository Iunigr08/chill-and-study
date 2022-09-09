<template>
  <div>
    <form @submit.prevent="submit" class="input-area">
      <div class="group email-group">
        <input
          v-model="email"
          type="email"
          id="email"
          autocomplete="email"
          required="required"
        />
        <label for="email">メールアドレス</label>
      </div>
      <div class="group password-group">
        <input
          v-model="password"
          type="password"
          id="password"
          autocomplete="current-password"
          required="required"
        />
        <label for="password">パスワード</label>
      </div>
      <div class="button-group">
        <button>ログイン</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { auth } from "../../main"
import { signInWithEmailAndPassword } from "firebase/auth"

export default {
  data: function () {
    return {}
  },
  // mounted: function () {
  //   if (this.$store.state.loginStatus) {
  //     console.log("login redirect")
  //     this.$route.query.redirect
  //       ? this.$router.push(this.$route.query.redirect)
  //       : this.$router.push("/")
  //   }
  // },
  computed: {
    ...mapState(["user"]),
    email: {
      get() {
        return this.user.Email
      },
      set(v) {
        this.$store.commit("setUserEmail", v)
      },
    },
    password: {
      get() {
        return this.user.Password
      },
      set(v) {
        this.$store.commit("setUserPassword", v)
      },
    },
  },
  methods: {
    submit: function () {
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          alert("ログインに成功しました．お帰りなさい！")
          const user = userCredential.user
          console.log("ログイン成功：", user.uid)
          this.$store.commit("setLoginStatus", true)
        })
        .then(() => {
          this.$route.query.redirect
            ? this.$router.push(this.$route.query.redirect)
            : this.$router.push("/")
        })
        .catch((error) => {
          alert("Eメール，パスワードに誤りがあります．")
          console.error(error.message)
          this.$router.push("/login")
        })
    },
  },
}
</script>

<style scoped>
.input-area {
  width: 100%;
}
.input-area * {
  box-sizing: border-box;
}
.group {
  position: relative;
  width: 100%;
  height: 4rem;
  margin: 4rem 0;
}
.group input {
  width: calc(100%);
  height: 4rem;
  padding: 0 2rem;
  border: 1px solid var(--bg-deep-gray);
  border-radius: 0.4rem;
  font-size: 1.4rem;
  color: var(--bg-deep-gray);
  background-color: var(--bgcolor);
  box-sizing: border-box;
  outline: none;
  z-index: 1;
}
.group label {
  height: 2rem;
  line-height: 2rem;
  padding: 0 0.4rem;
  display: block;
  position: absolute;
  top: 1rem;
  left: 2rem;
  font-size: 1.4rem;
  color: var(--bg-deep-gray);
  pointer-events: none;
  transition: 0.2s;
  z-index: 0;
}
.group input:focus + label,
.group input:valid + label {
  top: -1.2rem;
  left: 0.8rem;
  font-size: 1.2rem;
  background-color: var(--bgcolor);
}
.button-group {
  display: flex;
}
.button-group button {
  margin: 0 auto;
  padding: 0.6rem 2rem;
  /* font-weight: bold; */
  color: var(--text-default-green);
  background-color: var(--bg-gray);
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  transition: 0.2s;
}
.button-group button:hover {
  color: var(--bgcolor);
  background-color: var(--text-default-green);
}
</style>
