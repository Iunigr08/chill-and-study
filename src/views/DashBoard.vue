<template>
  <HomeLayout>
    <div class="dashboard">
      <div><DashboardData /></div>
    </div>
  </HomeLayout>
</template>

<script>
import HomeLayout from "../components/Flame/HomeLayout.vue"
import DashboardData from "../components/Dashboard/DashboardData.vue"

export default {
  name: "DashBoard",
  components: {
    HomeLayout,
    DashboardData,
  },
}
</script>

<style scoped>
.dashboard {
  height: 90vh;
  overflow-y: scroll;
}
</style>
