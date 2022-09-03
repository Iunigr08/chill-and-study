<template>
  <HomeLayout>
    <div class="dashboard">
      <div><DashboardData /></div>
    </div>
  </HomeLayout>
</template>

<script>
import HomeLayout from "../components/HomeLayout.vue"
import DashboardData from "../components/DashboardData.vue"

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
