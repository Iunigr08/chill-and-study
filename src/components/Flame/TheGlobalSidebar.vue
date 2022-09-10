<template>
  <div class="sidebar-wrap">
    <div class="sidebar">
      <div class="fold-menu" @click="toggleFold">
        <i v-if="menu_unfolded" class="ri-menu-fold-fill"></i>
        <i v-else class="ri-menu-unfold-fill"></i>
      </div>
      <div class="router-ul router-ul-links">
        <div class="router-li">
          <router-link
            to="/"
            exact
            class="router-a"
            :class="unfolded ? 'menu-unfolded' : 'menu-folded'"
            active-class="link--active"
          >
            <label>カウントダウンタイマー</label>
            <span class="router-a--icon">
              <i class="ri-timer-2-fill"></i>
            </span>
            <span class="router-a--title title--timer">タイマー</span>
          </router-link>
        </div>
        <div class="router-li">
          <router-link
            to="/clock"
            exact
            class="router-a"
            active-class="link--active"
          >
            <span class="router-a--icon">
              <i class="ri-time-fill"></i>
            </span>
            <span class="router-a--title title--clock">時計</span>
            <label>デジタル時計</label>
          </router-link>
        </div>
        <div class="router-li">
          <router-link
            to="/dashboard"
            exact
            class="router-a"
            active-class="link--active"
          >
            <span class="router-a--icon">
              <i class="ri-dashboard-fill"></i>
            </span>
            <span class="router-a--title title--dashboard">ダッシュボード</span>
            <label>記録の管理</label>
          </router-link>
        </div>
      </div>
      <div class="user-profile"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheGlobalSidebar",
  props: {
    prop_toggleFold: Function,
  },
  data: function () {
    return {
      unfolded: true,
    }
  },
  mounted: function () {},
  computed: {
    menu_unfolded: {
      get() {
        return !this.$store.getters.isFolded
      },
    },
  },
  methods: {
    toggleFold: function () {
      // this.menuFolded = !this.menuFolded
      // this.unfolded = !this.unfolded
      this.$store.commit("toggleFold")
    },
  },
}
</script>

<style scoped>
.sidebar-wrap {
  width: 100%;
  display: flex;
  align-content: center;
  width: calc(100% - 2rem);
  margin-right: 2rem;
}
.sidebar-wrap .sidebar {
  position: relative;
  width: calc(100% - 1rem - 2rem);
  height: 86%;
  margin-left: 0;
  /* margin-left: 1rem; */
  padding-left: 1rem;
  margin-right: 3rem;
  overflow-x: hidden;
}
.sidebar * {
  letter-spacing: 0.2rem;
}
.fold-menu {
  position: relative;
  color: var(--text-light-green);
  font-size: 2.4rem;
  width: 3.4rem;
  height: 3.4rem;
  margin-top: 1.6rem;
  margin-left: 0.2rem;
  border-radius: 100%;
  cursor: pointer;
  transition: 0.2s;
}
.fold-menu:hover {
  background-color: var(--bg-gray);
  border-radius: 100%;
  color: var(--text-deep-green);
}
.fold-menu i {
  position: absolute;
  left: 0.4rem;
  top: 0.5rem;
}
.router-ul {
  width: 100%;
}
.router-ul-login {
  position: absolute;
  bottom: 0;
  /* transform: translateY(-4rem); */
}
.router-li {
  position: relative;
  margin: 1.6rem 0;
  width: 100%;
  height: 3.6rem;
  /* height: 4.2rem; */
  /* padding-left: 3.6rem; */
}
.router-a {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;

  /* border: 1px solid #bfbfb0b5; */
  border-radius: 0.6rem;
  border-radius: 0 4rem 4rem 0;
  /* color: #404040; */
  color: #404040da;
  color: var(--text-light-green);

  transition: 0.15s;
}
.router-a:hover {
  background-color: var(--bg-light-gray);
}
.router-a:hover::before {
  content: "";
  width: 2rem;
  height: 100%;
  position: absolute;
  top: 0;
  left: -2rem;

  background-color: var(--bg-light-gray);
  background-color: var(--bg-gray);
}
span.router-a--icon {
  font-size: 2.4rem;
  position: absolute;
  left: 0.5rem;
  /* height: 4.2rem; */
  /* padding: 0 0.6rem 0 1rem; */
  transform: translateY(0.2rem);
}
span.router-a--title {
  padding-left: 3.7rem;
  font-size: 1.7rem;
  vertical-align: text-bottom;
  white-space: nowrap;
}
.link--active,
.link--active:hover {
  /* color: var(--text-deep-green); */
  /* background-color: var(--bg-gray); */
  color: white;
  background-color: var(--text-default-green);
}
.link--active::before,
.link-active:hover::before {
  content: "";
  width: 2rem;
  height: 100%;
  position: absolute;
  top: 0;
  left: -2rem;
  z-index: 2;

  background-color: var(--bg-gray);
}
.router-a label {
  display: none;
  width: 100%;
  height: 100%;
}
.router-a:hover + label {
  display: block;
  position: absolute;
  right: 0;
}
</style>
