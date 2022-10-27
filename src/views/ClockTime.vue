<template>
  <HomeLayout>
    <div>
      <div class="clock-time">
        <ClockState color="deeper-green" />
      </div>
      <div class="display-date display-wrap">
        <div class="display-box">
          <span class="date-week">{{ week }}</span>
          <span class="date-month-day">{{ monthday }}</span>
          <span class="date-year">{{ year }}</span>
        </div>
      </div>
      <!-- <Success /> -->
    </div>
  </HomeLayout>
</template>

<script>
import HomeLayout from "../components/Flame/HomeLayout.vue"
// import Success from "../components/SoundModule.vue"
import ClockState from "../components/Clock/ClockState.vue"

export default {
  name: "ClockTime",
  components: {
    HomeLayout,
    // Success,
    ClockState,
  },
  data: function () {
    return {
      week: "",
      monthday: "",
      year: "",
      interval: null,
    }
  },
  created: function () {
    // 日付情報
    const weeks = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednedsday",
      "Thursday",
      "Fryday",
      "Saturday",
    ]
    const months = [
      "January",
      "February",
      "March",
      "Aprill",
      "May",
      "June",
      "July",
      "August",
      "October",
      "Novenber",
      "December",
    ]
    const date = new Date()
    this.week = weeks[date.getDay()] + ","
    this.monthday = months[date.getMonth()] + " " + date.getDate() + ","
    this.year = date.getFullYear()
  },
  methods: {},
}
</script>

<style scoped>
.clock-time {
  width: 100%;
  height: 68vh;
  font-size: 12.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.display-wrap {
  color: var(--text-deeper-green);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  /* font-family: var(--font-lato); */
}
.display-box {
  padding-right: 4rem;
}
.display-date {
  width: 80%;
  margin: 0 auto;
  letter-spacing: 0.2rem;
  font-size: 2.4rem;
  font-weight: 100;
}
.date-week,
.date-month-day {
  padding-right: 2rem;
}
</style>
