<template>
  <div>
    <form @submit.prevent="submit" class="input-area">
      <div class="group username-group">
        <input
          v-model="username"
          id="username"
          type="text"
          required="required"
        />
        <label for="username">お名前</label>
      </div>
      <div class="group email-group">
        <input
          v-model="email"
          type="email"
          id="email"
          autocomplete="email"
          required="required"
        />
        <label for="username">メールアドレス</label>
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
        <button>新規登録</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { auth } from "../main"
import { createUserWithEmailAndPassword } from "firebase/auth"

export default {
  data: function () {
    return {}
  },
  computed: {
    ...mapState(["user"]),
    username: {
      get() {
        return this.user.UserName
      },
      set(v) {
        this.$store.commit("setUserName", v)
      },
    },
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
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          alert(`${this.username}さんを登録しました．ようこそ，ちるスタへ！`)
          // this.$store.commit("setUserInfo", userCredential)
          // this.$store.dispatch("asyncSetUserInfo", userCredential).then(() => {
          //   })
          this.$store.commit("setLoginStatus", true)
          this.$store.dispatch("createUserDatabase")
          this.$router.push("/")
          console.log("Completed CreateUser")
        })
        .catch((err) => {
          alert("ユーザ登録に失敗しました．入力項目を確認してください．")
          console.log("failed create user")
          console.error(err)
        })
      return null
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
  top: -1rem;
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
