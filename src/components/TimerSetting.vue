<template>
  <!-- 外枠 -->
  <div class="content">
    <!-- 上段 -->
    <div class="top_flame">
      <!-- 集中時間欄 -->
      <div class="work_time_box">
        <span class="name_of_work name">ワークタイム</span>
        <!-- 集中時間のセレクトボタン -->
        <span class="work_time_select">
          <SelectTime
            :prop_select_time="timeState[0]"
            :prop_index_num="1"
            :prop_index1="0"
            :prop_index2="0"
            @emit_event="change_time"
          />
        </span>
      </div>
    </div>

    <!-- 中段 -->
    <div class="center_flame">
      <div class="flex_center_box">
        <div class="break_time_box">
          <!-- 休憩時間欄 -->
          <span class="name_of_break name">ちるタイム</span>
          <!-- 休憩時間のセレクトボタン -->
          <span class="select_break_time">
            <SelectTime
              :prop_select_time="timeState[1]"
              :prop_index_num="1"
              :prop_index1="1"
              :prop_index2="0"
              @emit_event="change_time"
            />
          </span>
        </div>

        <div class="lap_num_box">
          <!-- 周回数欄 -->
          <span class="name_of_lap name">ラップ数</span>
          <span class="select_lap_num">
            <!-- 周回数のセレクトボタン -->
            <SelectLap
              :prop_select_lap="timeState[2]"
              :prop_index="2"
              @emit_event_lap="change_lap"
            />
          </span>
        </div>
      </div>
    </div>

    <!-- 下段 -->
    <div class="bottom_flame">
      <!-- プリセットボタン欄 -->
      <div class="flex_preset_box">
        <div class="preset_button_box">
          <i class="ri-bookmark-fill"></i>
          <!-- プリセットボタン1 -->
          <button class="preset1_button preset_button" @click="preset1">
            <span class="hour">
              <DispTimeAnother :prop_disp_time_another="getpreset[0][0]" />
            </span>
            <span class="min">
              <DispTimeAnother :prop_disp_time_another="getpreset[0][1]" />
            </span>
            <span class="lap">
              <DispLapAnother :prop_disp_lap="getpreset[0][2]" />
            </span>
          </button>

          <!-- プリセットボタン2 -->
          <button class="preset2_button preset_button" @click="preset2">
            <span class="hour">
              <DispTimeAnother :prop_disp_time_another="getpreset[1][0]" />
            </span>
            <span class="min">
              <DispTimeAnother :prop_disp_time_another="getpreset[1][1]" />
            </span>
            <span class="lap">
              <DispLapAnother :prop_disp_lap="getpreset[1][2]" />
            </span>
          </button>

          <!-- プリセットボタン3 -->
          <button class="preset3_button preset_button" @click="preset3">
            <span class="hour">
              <DispTimeAnother :prop_disp_time_another="getpreset[2][0]" />
            </span>
            <span class="min">
              <DispTimeAnother :prop_disp_time_another="getpreset[2][1]" />
            </span>
            <span class="lap">
              <DispLapAnother :prop_disp_lap="getpreset[2][2]" />
            </span>
          </button>
        </div>
      </div>

      <!-- 送信ボタン欄 -->
      <div class="goButton">
        <router-link
          class="go_timer_screen"
          :to="{ name: 'TimerScreen', query: { prop_time: timeState } }"
          >OK</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import SelectTime from "./SelectTime.vue"
import SelectLap from "./SelectLap.vue"
import DispTimeAnother from "./DispTimeAnother.vue"
import DispLapAnother from "./DispLapAnother.vue"

export default {
  components: {
    SelectTime,
    SelectLap,
    DispTimeAnother,
    DispLapAnother,
  },
  data: function () {
    return {
      // 表示されるタイマー設定(最終的に送る設定時間でもある)
      timeState: null,

      // 渡されるプリセット(データベースから3つ渡される)
      getpreset: null,
    }
  },

  created: function () {
    this.getpreset = this.$store.getters.getpreset
    // 表示される設定時間(集中時間・休憩時間・周回数)
    this.timeState = [[0, 0, 0], [0, 0, 0], 0]
  },

  methods: {
    // プリセットボタンが押されたら、設定・表示する
    preset1: function () {
      this.timeState = JSON.parse(JSON.stringify(this.getpreset[0]))
    },
    preset2: function () {
      this.timeState = JSON.parse(JSON.stringify(this.getpreset[1]))
    },
    preset3: function () {
      this.timeState = JSON.parse(JSON.stringify(this.getpreset[2]))
    },

    // セレクトコンポーネントからの変更を反映させる
    change_time(prop_index1, temp) {
      this.timeState[prop_index1] = JSON.parse(JSON.stringify(temp))
    },
    change_lap(prop_index, selectedLap) {
      this.timeState[prop_index] = JSON.parse(JSON.stringify(selectedLap))
    },
  },
}
</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;
}
/* 上段 */
.top_flame {
  display: flex;
  text-align: center;
  justify-content: center;
  align-content: center;
}
.work_time_box {
  text-align: left;
}
/* .name {
} */
.name_of_work {
  bottom: -20%;
  position: relative;
}
.work_time_select {
  white-space: nowrap;
  text-align: center;
  justify-content: center;
  align-content: center;
}
.work_time_select .container {
  font-size: 500%;
}
/* 中段 */
.center_flame {
  margin: 5% 0;
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
}
.flex_center_box {
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
  gap: 30%;
}
.break_time_box {
  display: inline-block;
  inline-size: 100%;
  white-space: nowrap;
}
.name_of_break {
  display: block;
  text-align: left;
  margin: 10% 0 -5% 0;
}
.select_break_time {
  display: block;
  text-align: left;
}
.select_break_time .container {
  font-size: 300%;
}
.lap_num_box {
  display: inline;
  inline-size: 100%;
  white-space: nowrap;
  /* margin: 10% 0 -5% 0; */
}
.name_of_lap {
  display: block;
  text-align: left;
  margin: 40% 0 -25% 0;
}
.select_lap_num {
  display: block;
  text-align: left;
}
.select_lap_num .container {
  font-size: 300%;
}
/* 下段 */
.bottom_flame {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-content: stretch;
}
.flex_preset_box {
  display: flex;
  text-align: center;
  justify-content: center;
  align-content: center;
  white-space: nowrap;
}
.preset_button_box button {
  background-color: var(--text-default-green);
  color: white;
  display: inline;
}
.preset_button_box {
  display: inline;
  text-align: center;
  justify-content: center;
  align-content: center;
  inline-size: 100%;
}
.ri-bookmark-fill {
  color: white;
  position: absolute;
  margin-top: 0.7rem;
  margin-left: 0.5rem;
}
.preset_button_box >>> .content {
  text-align: center;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.preset_button {
  display: inline;
  padding: 1.5rem 4rem;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.hour {
  font-size: 2rem;
}
.min {
  font-size: 1.5rem;
}
.lap {
  font-size: 1.5rem;
}
/* .preset1_button {
} */
.preset2_button {
  position: relative;
}
.preset2_button::before {
  content: "";
  display: inline-block;
  width: 2px;
  height: 80%;
  background-color: white;
  position: absolute;
  top: 10%;
  left: 0%;
}
.preset2_button::after {
  content: "";
  display: inline-block;
  width: 2px;
  height: 80%;
  background-color: white;
  position: absolute;
  top: 10%;
  right: 0%;
}
/* .preset3_button {
} */
.goButton {
  margin-left: 45%;
  margin-right: 45%;
  margin-top: 3%;
  border-radius: 5%/20%;
  background-color: var(--text-default-green);
  color: white;
  width: 10%;
}
.go_timer_screen {
  display: block;
  padding: 0.4rem 2rem;
}
</style>
