<template>
  <!-- 外枠 -->
  <div class="container">
    <!-- 時間表示枠 -->
    <div class="disp-select-time" v-if="dispTimeBox">
      <!-- 時間 -->
      <span class="hour-box select-box" @click="hourSelectMode">
        {{ hourTime }}
      </span>
      <!-- 時間の矢印 -->
      <span><i class="ri-arrow-down-s-fill arrow-icon"></i></span>
      <!-- 時間の選択肢 -->
      <div class="select-list select-list-hour" v-if="hourSelectingMode">
        <ul>
          <li
            class="lists"
            @click="selectedHour(n)"
            v-for="n in 59"
            v-bind:key="n"
          >
            {{ n }}
          </li>
        </ul>
      </div>
      <!-- 時間と分の間のコロン -->
      <span class="colon">:</span>
      <!-- 分 -->
      <span class="min-box select-box" @click="minSelectMode">
        {{ minTime }}
      </span>
      <!-- 分の矢印 -->
      <span><i class="ri-arrow-down-s-fill arrow-icon"></i></span>
      <!-- 分の選択肢 -->
      <div class="select-list select-list-min" v-if="minSelectingMode">
        <ul>
          <li
            class="lists"
            @click="selectedMin(n)"
            v-for="n in 59"
            v-bind:key="n"
          >
            {{ n }}
          </li>
        </ul>
      </div>
      <!-- 分と秒の間のコロン -->
      <span class="colon">:</span>
      <!-- 秒 -->
      <span class="sec-box select-box" @click="secSelectMode">
        {{ secTime }}
      </span>
      <!-- 秒の矢印 -->
      <span><i class="ri-arrow-down-s-fill arrow-icon"></i></span>
      <!-- 秒の選択肢 -->
      <div class="select-list select-list-sec" v-if="secSelectingMode">
        <ul>
          <li
            class="lists"
            @click="selectedSec(n)"
            v-for="n in 59"
            v-bind:key="n"
          >
            {{ n }}
          </li>
        </ul>
      </div>
    </div>
    <!-- ラップ数表示枠 -->
    <div class="disp-select-lap" v-if="!dispTimeBox">
      <!-- <span class="lap-box">{{lapNum}}</span> -->
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      dispTimeBox: null, // true:timeを表示, false:lapを表示
      copyData: null, // propsから受け取ったデータをコピーする用
      // propsのdefault用のobj
      defaultObj: {
        key: "time",
        dataArray: [1, 2, 3],
      },
      dispData: [0, 0, 0], // 表示するデータ:[時間, 分, 秒]
      hourSelectingMode: false, // true:選択肢表示中, false:非表示中
      minSelectingMode: false, // true:選択肢表示中, false:非表示中
      secSelectingMode: false, // true:選択肢表示中, false:非表示中
    }
  },

  props: {
    prop_data: {
      type: Object,
      required: true,
      default: () => {},
    },
  },

  created: function () {
    // propsで受け取った表示したいデータをディープコピー
    this.copyData = JSON.parse(JSON.stringify(this.prop_data))
    this.dispData = JSON.parse(JSON.stringify(this.prop_data.dataArray))

    // propsで受け取ったデータから「タイム」なのか「ラップ」なのかを場合分け
    if (this.prop_data.key == "time") {
      this.dispTimeBox = true
    } else {
      this.dispTimeBox = false
    }

    // 表示用の配列に格納
    // this.toDivideArray()
  },

  methods: {
    toDivideArray: function () {
      this.dispData = this.copyData.match(/.{2}/g)
    },

    // クリックしたら選択モードに変更
    hourSelectMode: function () {
      this.hourSelectingMode = !this.hourSelectingMode
    },
    minSelectMode: function () {
      this.minSelectingMode = !this.minSelectingMode
    },
    secSelectMode: function () {
      this.secSelectingMode = !this.secSelectingMode
    },

    // 選択された値を上書きして、親にemitする
    selectedHour: function (n) {
      this.dispData[0] = n
      this.copyData.dataArray[0] = this.dispData[0]
      this.hourSelectingMode = !this.hourSelectingMode
      this.$emit("emit_event", this.copyData)
    },
    selectedMin: function (n) {
      this.dispData[1] = n
      this.copyData.dataArray[1] = this.dispData[1]
      this.minSelectingMode = !this.minSelectingMode
      this.$emit("emit_event", this.copyData)
    },
    selectedSec: function (n) {
      this.dispData[2] = n
      this.copyData.dataArray[2] = this.dispData[2]
      this.secSelectingMode = !this.secSelectingMode
      this.$emit("emit_event", this.copyData)
    },
  },

  computed: {
    hourTime: function () {
      return ("00" + this.dispData[0]).slice(-2)
    },
    minTime: function () {
      return ("00" + this.dispData[1]).slice(-2)
    },
    secTime: function () {
      return ("00" + this.dispData[2]).slice(-2)
    },
    // lapNum: function () {
    //   return ("00" + this)
    // }
  },
}
</script>

<style scoped>
.container {
  display: inline-block;
}
.disp-select-time {
  color: var(--text-deeper-green);
  font-weight: bold;
  margin: 1rem;
  position: relative;
  z-index: 1;
  justify-content: center;
}
.select-box {
  cursor: pointer;
  font-size: 5rem;
}
.hour-box::after {
  content: "";
  width: 7.5rem;
  height: 0.5rem;
  display: block;
  background-color: var(--text-light-green);
  position: absolute;
  left: 0;
  bottom: 0.5rem;
  border-radius: 5%/30%;
}
.min-box::after {
  content: "";
  width: 7.5rem;
  height: 0.5rem;
  display: block;
  background-color: var(--text-light-green);
  position: absolute;
  left: 10rem;
  bottom: 0.5rem;
  border-radius: 5%/30%;
}
.sec-box::after {
  content: "";
  width: 7.5rem;
  height: 0.5rem;
  display: block;
  background-color: var(--text-light-green);
  position: absolute;
  left: 20rem;
  bottom: 0.5rem;
  border-radius: 5%/30%;
}
.select-list {
  overflow-y: scroll;
  height: 30rem;
  width: 6rem;
}
.select-list ul {
  text-align: center;
}
.select-list-hour {
  position: absolute;
  z-index: 10;
  background-color: var(--bg-gray);
}
.select-list-min {
  position: absolute;
  left: 10rem;
  z-index: 10;
  background-color: var(--bg-gray);
}
.select-list-sec {
  position: absolute;
  left: 20.1rem;
  z-index: 10;
  background-color: var(--bg-gray);
}
.select-list::-webkit-scrollbar {
  width: 6px;
  height: 10px;
  margin-right: 6rem;
}
.select-list::-webkit-scrollbar-thumb {
  border-radius: 6px;
}
.select-list::-webkit-scrollbar-thumb {
  background-color: var(--text-deeper-green);
}
.select-list::-webkit-scrollbar-track {
  background-color: var(--bg-gray);
  border-radius: 10px;
}
.lists {
  cursor: pointer;
  transition: 0.2s;
}
ul:hover li {
  /* opacity: 0.5; */
  font-size: 2rem;
}
ul li:hover {
  /* opacity: 1; */
  font-size: 3.5rem;
}
.arrow-icon {
  font-size: 2rem;
  color: var(--text-light-green);
  position: relative;
  bottom: -0.5rem;
}
.colon {
  vertical-align: 0.4rem;
  margin: 0 0.5rem 0 0;
  font-size: 5rem;
}
</style>
