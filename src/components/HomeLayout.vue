<template>
  <div class="home-layout">
    <TheGlobalHeader class="header" />
    <TheGlobalSidebar
      class="sidebar"
      :class="menuIsFolded ? 'menu-folded' : 'menu-unfolded'"
    ></TheGlobalSidebar>
    <div class="main-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import TheGlobalSidebar from "./Flame/TheGlobalSidebar.vue"
import TheGlobalHeader from "./Flame/TheGlobalHeader.vue"

export default {
  name: "HomeLayout",
  components: {
    TheGlobalSidebar,
    TheGlobalHeader,
  },
  data: function () {
    return {
      menuFolded: false,
    }
  },
  methods: {
    toggleFold: function () {
      // this.menuFolded = !this.menuFolded
    },
  },
  computed: {
    menuIsFolded: {
      get() {
        return this.$store.getters.isFolded
      },
    },
  },
}
</script>

<style scoped>
.home-layout {
  overflow: hidden;
  width: 100%;
  height: 100%;

  /* css-grid */
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: 5rem 1fr;
  /* grid-template-areas: "header header" "side-bar main"; */
}
.header {
  /* grid-area: "header"; */
  grid-row: 1/2;
  grid-column: 1/3;
  width: 100%;
  height: 5rem;
  /* border: #000; */
}
.sidebar {
  position: relative; /* after要素の基準 */
  /* grid-area: "side-bar"; */
  grid-row: 2/3;
  grid-column: 1/2;
  /* サイドバーのwidthは別クラスで実装（メニューフォールド処理のため） */
  /* width: 26rem; */
  /* width: 25rem; */
  height: 100%;
  /* height: calc(100% - 2rem); */
  /* margin: 1rem 0; */
  font-size: 2rem;
  transition: 0.2s;
}
.sidebar::after {
  content: "";
  position: absolute;
  top: 2rem;
  right: 2rem;

  /* shaping */
  /* width: 1.8rem; */
  /* width: 86%; */
  height: calc(100% - 4rem);

  /* mophing */
  background-color: #bfbfbf;
  border-radius: 4px;
  background: #e1d6d6;
  /* box-shadow: 8px 8px 17px #b9afaf, -8px -8px 17px #fffdfd; */
  /* box-shadow: -5px 5px 10px #d1c7c7, 5px -5px 10px #f1e5e5; */
  box-shadow: -5px 5px 12px #b2a9a9, 5px -5px 12px #ffffff;
}
.menu-folded {
  width: 7.8rem;
}
.menu-unfolded {
  width: 25rem;
}
.main-content {
  /* grid-area: "main"; */
  grid-row: 2/3;
  grid-column: 2/3;
  /* width: 20vw; */
  height: 100%;
  /* border: 1px solid pink; */
  font-size: 2rem;
}
</style>
