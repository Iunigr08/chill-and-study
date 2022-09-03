<template>
  <!-- <div>{{ clock }}</div> -->
  <div
    class="clock-main"
    :class="color === 'light-green' ? 'text-light-green' : ''"
  >
    <div class="display-clock display-wrap">
      <div class="display-box">
        <span class="clock-time--large hour">{{ timeArray[0] }}</span>
        <span class="clock-time--large coron">：</span
        ><span class="clock-time--large min">{{ timeArray[1] }}</span>
        <span class="sec">{{ timeArray[2] }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
    },
  },
  data: function () {
    return {
      timeArray: ["", "", ""],
      interval: null,
    }
  },
  created: function () {
    /* 描画初期状態でもラグなく時刻を表示する.
       setIntervalだけだと表示にラグが生じる. */
    this.tick()
    // eslint-disable-next-line no-unused-vars
    this.interval = setInterval(this.tick, 1000)
  },
  beforeUnmount: function () {
    this.clearCount()
  },
  methods: {
    tick() {
      const date = new Date()
      // let h = date.getHours()
      // let m = date.getMinutes()
      // let s = date.getSeconds()
      // if (h < 10) h = "0" + h
      // if (m < 10) m = "0" + m
      // if (s < 10) s = "0" + s
      // this.clock = h + ":" + m + ":" + s
      this.timeArray = [
        date.getHours().toString(),
        date.getMinutes().toString(),
        date.getSeconds().toString(),
      ].map((str) => {
        str.length < 2 ? (str = "0" + str) : str
        return str
      })
    },
    clearCount: function () {
      clearInterval(this.interval)
    },
  },
}
</script>

<style scoped>
.clock-main {
  color: var(--text-deeper-green);
  font-size: 100%;
  /* font-family: var(--font-lato); */
}
.text-light-green {
  color: var(--text-light-green);
}
.display-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.display-clock {
  /* width: 80%; */
  height: 100%;
  margin: 0 auto;
  letter-spacing: 0.08em;
}
.display-box {
  padding-right: 4rem;
}
span.clock-time--large {
  font-weight: 700;
}
span.coron {
  font-size: 78%;
  padding: 0;
}
span.hour {
  padding-left: 0;
}
span.sec {
  font-size: 52%;
  letter-spacing: 0.06em;
}
</style>
