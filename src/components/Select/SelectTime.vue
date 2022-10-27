<template>
  <!-- 外枠 -->
  <div class="container">
    <!-- 表示枠 -->
    <div class="disp_box">
      <!-- 時間枠 -->
      <span class="hour_box">
        <!-- 時間セレクト枠 -->
        <span class="hour_select select-underbar">
          <select name="selectHour" v-model.number="selectHour">
            <option v-for="n in 11" v-bind:key="n">
              {{ ("00" + (n - 1)).slice(-2) }}
            </option>
          </select>
        </span>
        <!-- 時間の矢印 -->
        <span class="arrow">
          <i class="ri-arrow-down-s-fill arrow_of_hour"></i>
        </span>
      </span>
      <!-- 時間と分の間のコロン -->
      <span class="colon colon_hour_to_min">:</span>
      <!-- 分数枠 -->
      <span class="min_box">
        <!-- 分数セレクト枠 -->
        <span class="min_select select-underbar">
          <select name="selectMin" v-model.number="selectMin">
            <option v-for="n in 60" v-bind:key="n">
              {{ ("00" + (n - 1)).slice(-2) }}
            </option>
          </select>
        </span>
        <!-- 分数の矢印 -->
        <span class="arrow">
          <i class="ri-arrow-down-s-fill arrow_of_min"></i>
        </span>
      </span>
      <!-- 分数と秒数の間のコロン -->
      <span class="colon colon_min_to_sec">:</span>
      <!-- 秒数枠 -->
      <span class="sec_box">
        <!-- 秒数セレクト枠 -->
        <span class="sec_select select-underbar">
          <select name="selectSec" v-model.number="selectSec">
            <option v-for="n in 60" v-bind:key="n">
              {{ ("00" + (n - 1)).slice(-2) }}
            </option>
          </select>
        </span>
        <!-- 秒数の矢印 -->
        <span class="arrow">
          <i class="ri-arrow-down-s-fill arrow_of_sec"></i>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      // emitで返す用の配列
      temp: null,
    }
  },

  props: {
    prop_select_time: {
      type: Array,
      required: true,
      default: () => [0, 0, 0],
    },
    prop_index_num: {
      type: Number,
      required: true,
      default: 0,
    },
    prop_index1: {
      type: Number,
      required: true,
      default: 0,
    },
    prop_index2: {
      type: Number,
      required: true,
      default: 0,
    },
  },

  computed: {
    selectHour: {
      get() {
        return ("00" + this.prop_select_time[0]).slice(-2)
      },
      set(selectedHour) {
        this.temp[0] = selectedHour
        if (this.prop_index_num == 0) {
          this.$emit("emit_event", this.temp)
        } else if (this.prop_index_num == 1) {
          this.$emit("emit_event", this.prop_index1, this.temp)
        } else {
          this.$emit(
            "emit_event",
            this.prop_index1,
            this.prop_index2,
            this.temp
          )
        }
      },
    },
    selectMin: {
      get() {
        return ("00" + this.prop_select_time[1]).slice(-2)
      },
      set(selectedMin) {
        this.temp[1] = selectedMin
        if (this.prop_index_num == 0) {
          this.$emit("emit_event", this.temp)
        } else if (this.prop_index_num == 1) {
          this.$emit("emit_event", this.prop_index1, this.temp)
        } else {
          this.$emit(
            "emit_event",
            this.prop_index1,
            this.prop_index2,
            this.temp
          )
        }
      },
    },
    selectSec: {
      get() {
        return ("00" + this.prop_select_time[2]).slice(-2)
      },
      set(selectedSec) {
        this.temp[2] = selectedSec
        if (this.prop_index_num == 0) {
          this.$emit("emit_event", this.temp)
        } else if (this.prop_index_num == 1) {
          this.$emit("emit_event", this.prop_index1, this.temp)
        } else {
          this.$emit(
            "emit_event",
            this.prop_index1,
            this.prop_index2,
            this.temp
          )
        }
      },
    },
  },

  watch: {
    prop_select_time: {
      handler: function () {
        this.temp = this.prop_select_time
      },
      deep: true,
      immediate: true,
    },
  },
}
</script>

<style scoped>
.container {
  /* background-color: var(--bgcolor); */
  background-color: transparent;
  justify-content: center;
  align-content: center;
  text-align: left;
  white-space: nowrap;
}
.disp_box {
  display: inline;
  justify-content: center;
  align-content: center;
  text-align: center;
}
.hour_box {
  position: relative;
}
.min_box {
  position: relative;
}
.sec_box {
  position: relative;
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
  /* background-color: var(--bgcolor); */
  background-color: transparent;

  height: 100%;
  /* display: block; */
  cursor: pointer;
}
.select-underbar::after {
  content: "";
  width: 80%;
  height: 5%;
  display: block;
  background-color: var(--text-light-green);
  position: absolute;
  left: 0;
  bottom: 10%;
  border-radius: 5%/30%;

  width: 90%;
}
/* .hour_select::after {
  content: "";
  width: 80%;
  height: 5%;
  display: block;
  background-color: var(--text-light-green);
  position: absolute;
  left: 0;
  bottom: 10%;
  border-radius: 5%/30%;
}
.min_select::after {
  content: "";
  width: 80%;
  height: 5%;
  display: block;
  background-color: var(--text-light-green);
  position: absolute;
  left: 0;
  bottom: 10%;
  border-radius: 5%/30%;

  width: 110%;
}
.sec_select::after {
  content: "";
  width: 80%;
  height: 5%;
  display: block;
  background-color: var(--text-light-green);
  position: absolute;
  left: 0;
  bottom: 10%;
  border-radius: 5%/30%;
} */
i {
  position: relative;
  color: var(--text-light-green);
  font-size: 50%;
  /* left: -1rem; */
  vertical-align: -30%;

  /* left: 70%; */
}
.colon {
  position: relative;
  /* vertical-align: 5%; */
  /* margin-right: 3%; */
  color: var(--text-deeper-green);

  margin-left: 2%;
  margin-right: 4%;
}
</style>
