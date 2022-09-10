<template>
  <!-- 外枠 -->
  <div class="container">
    <!-- ラップ数表示枠 -->
    <span class="lap_box">
      <!-- ラップ数セレクト枠 -->
      <span class="select_lap">
        <select class="select_lap" name="selectLap" v-model.number="selectLap">
          <option v-for="n in 11" v-bind:key="n">
            {{ ("00" + (n - 1)).slice(-2) }}
          </option>
        </select>
      </span>
      <!-- ラップ数の矢印 -->
      <span class="arrow">
        <i class="ri-arrow-down-s-fill arrow_of_lap"></i>
      </span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    prop_select_lap: {
      type: Number,
      required: true,
      default: 1,
    },
    prop_index: {
      type: Number,
      required: true,
      default: 0,
    },
  },

  computed: {
    selectLap: {
      get() {
        return ("00" + this.prop_select_lap).slice(-2)
      },
      set(selectedLap) {
        console.log("動いてる?")
        this.$emit("emit_event_lap", this.prop_index, selectedLap)
      },
    },
  },
}
</script>

<style scoped>
.container {
  background-color: var(--bgcolor);
  justify-content: center;
  align-content: center;
  text-align: left;
}
.lap_box {
  display: inline;
  position: relative;
  justify-content: center;
  align-content: center;
  text-align: center;
}
.select_lap::after {
  content: "";
  width: 80%;
  height: 5%;
  display: block;
  background-color: var(--text-light-green);
  position: absolute;
  left: 0;
  bottom: 5%;
  border-radius: 5%/30%;
}
.arrow {
  display: inline-block;
  position: relative;
  vertical-align: -5%;
}
select {
  border-top: none;
  border-bottom: none;
  border-left: none;
  border-right: none;
  appearance: none;
  font-weight: bold;
  font-size: 100%;
  color: var(--text-deeper-green);
  background-color: var(--bgcolor);
  vertical-align: -5%;
  cursor: pointer;
}
i {
  position: relative;
  color: var(--text-light-green);
  font-size: 50%;
  left: -30%;
  vertical-align: -30%;
}
</style>
