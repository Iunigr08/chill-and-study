<template>
  <HomeLayout>
    <SelectPulldown
      :prop_data="dispTimeObj"
      @emit_event="change_data"
    /><!-- ------------------------------------------------------------------------------------------------- -->
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
import HomeLayout from "../components/Flame/HomeLayout.vue"
import ClockTime from "../components/Clock/ClockState.vue"
// import TimerSetting from "../components/TimerSetting.vue"
// import TimerScreen from "../components/TimerScreen.vue"
// import TimerSave from "../components/TimerSave.vue"
import SelectPulldown from "../components/SelectPulldown.vue" // 後で消す----------------------------------------------------------

export default {
  data: function () {
    return {
      testDataArray: [10, 20, 30],
      dispTimeObj: {
        key: "time",
        dataArray: [11, 22, 33],
      },
      dispLapObj: {
        key: "lap",
        dataArray: 5,
      },
    }
  },
  methods: {
    change_data: function (dataObj) {
      console.log(dataObj.dataArray)
    },
  },
  components: {
    HomeLayout,
    ClockTime,
    // TimerSetting,
    // TimerScreen,
    // TimerSave,
    SelectPulldown, // 後で消す------------------------------------------------------------------------------------------------------
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
