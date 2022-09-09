<template>
  <div>
    <button v-on:click="playAudio">start</button>
    <button v-on:click="playReset">reset</button>
    <button @click="playStop">stop</button>
    <button @click="playFinish">finish</button>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      audioStart: new Audio(require("../assets/mp3/start.mp3")),
      audioReset: new Audio(require("../assets/mp3/reset.mp3")),
      audioStop: new Audio(require("../assets/mp3/stop.mp3")),
      audioFinish: new Audio(require("../assets/mp3/finish.mp3")),
    }
  },
  methods: {
    playAudio: function () {
      this.audioStart.play()
    },
    playReset: function () {
      this.audioReset.play()
    },
    playStop: function () {
      this.audioStop.play()
    },
    playFinish: function () {
      this.audioFinish.play()
    },
  },
}
</script>

<style scoped></style>
