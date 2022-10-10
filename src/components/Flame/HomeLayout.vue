<template>
  <div class="home-layout">
    <TheGlobalHeader class="header" />
    <TheGlobalSidebar
      class="sidebar"
      :class="menuIsFolded ? 'menu-folded' : 'menu-unfolded'"
    ></TheGlobalSidebar>
    <!-- スマホ用のサイドバー作るかー．．． -->
    <div class="main-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import TheGlobalSidebar from "./TheGlobalSidebar.vue"
import TheGlobalHeader from "./TheGlobalHeader.vue"

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
}
.header {
  grid-row: 1/2;
  grid-column: 1/3;
  width: 100%;
  height: 5rem;
}
.sidebar {
  position: relative; /* after要素の基準 */
  grid-row: 2/3;
  grid-column: 1/2;
  height: 100%;
  font-size: 2rem;
  transition: 0.2s;
}
.sidebar::after {
  content: "";
  position: absolute;
  top: 2rem;
  right: 2rem;

  height: calc(100% - 4rem);

  /* mophing */
  background-color: #bfbfbf;
  border-radius: 4px;
  background: #e1d6d6;
  box-shadow: -5px 5px 12px #b2a9a9, 5px -5px 12px #ffffff;
}
.menu-folded {
  width: 7.8rem;
}
.menu-unfolded {
  width: 25rem;
}
.main-content {
  grid-row: 2/3;
  grid-column: 2/3;
  height: 100%;
  height: calc(100% - 5rem);
  font-size: 2rem;
}

@media screen and (max-width: 560px) {
  .home-layout {
    grid-template-columns: 1fr;
    grid-template-rows: 4rem 1fr;
  }

  .header {
    grid-row: 1/2;
    grid-column: 1/2;
    height: 4rem;
  }

  .sidebar {
    /* grid-row: 2/3;
    grid-column: 1/2;
    display: none; */
    position: fixed;
    top: 4rem;
    left: 0;
  }

  .main-content {
    grid-row: 2/3;
    grid-column: 1/2;
    height: calc(100% - 4rem);
  }
}
</style>
