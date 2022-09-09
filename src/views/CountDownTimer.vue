<template>
  <HomeLayout>
    <div>
      <div class="show-time">
        <div class="item">
          <ClockTime color="light-green"></ClockTime>
        </div>
      </div>
      <div class="view-route">
        <router-view></router-view>
      </div>
      <!-- <TimerSetting />
      <TimerScreen />
      <TimerSave /> -->
    </div>
  </HomeLayout>
</template>

<script>
import HomeLayout from "../components/HomeLayout.vue"
import ClockTime from "../components/Clock/ClockState.vue"
// import TimerSetting from "../components/TimerSetting.vue"
// import TimerScreen from "../components/TimerScreen.vue"
// import TimerSave from "../components/TimerSave.vue"

export default {
  components: {
    HomeLayout,
    ClockTime,
    // TimerSetting,
    // TimerScreen,
    // TimerSave,
  },
}
</script>

<style scoped>
.show-time {
  width: 100%;
}
.show-time .item {
  width: fit-content;
  margin: 0 18% 0 auto;
  font-size: 3.6rem;
}
</style>
