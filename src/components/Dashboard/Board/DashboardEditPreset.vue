<template>
  <!-- 外枠 -->
  <div class="content">
    <!-- 表示枠 -->
    <div class="disp_flame">
      <div class="head_box">
        <!-- 表示プリセットの選択枠 -->
        <div class="select_disp_preset_num">
          <select name="selectPreset" v-model="selectedPreset">
            <option v-for="item in presets" :value="item.id" :key="item.id">
              {{ item.label }}
            </option>
          </select>
          <span class="arrow">
            <i class="ri-arrow-down-s-fill arrow_of_hour"></i>
          </span>
        </div>
        <!-- 編集・セーブ・リセット・キャンセルボタン -->
        <div class="select_edit_box">
          <span class="input_button_edit flex_input" v-if="!edit_time_now">
            <input type="button" value="編集する" @click="edit_time" />
            <i class="ri-arrow-down-s-fill arrow_of_hour"></i>
          </span>
          <span class="input_button_save flex_input" v-if="edit_time_now">
            <input type="button" value="セーブ" @click="save_edited_time" />
            <i class="ri-arrow-down-s-fill arrow_of_hour"></i>
          </span>
          <span class="input_button_reset flex_input" v-if="edit_time_now">
            <input type="button" value="リセット" @click="reset_edited_time" />
            <i class="ri-arrow-down-s-fill arrow_of_hour"></i>
          </span>
          <span class="input_button_cancel flex_input" v-if="edit_time_now">
            <input
              type="button"
              value="キャンセル"
              @click="cancel_edited_time"
            />
            <i class="ri-arrow-down-s-fill arrow_of_hour"></i>
          </span>
        </div>
      </div>
      <div class="center_box">
        <!-- 表示モード -->
        <div class="disp_mode" v-if="!edit_time_now">
          <!-- プリセット1 -->
          <div class="preset1" v-if="isPreset1">
            <div class="work_time">
              <span class="name_time">ワークタイム</span>
              <span>
                <DispTime
                  class="font_size_timer"
                  :prop_disp_time="dispPreset[0][0]"
                />
              </span>
            </div>
            <div class="chill_time">
              <span class="name_time">ちるタイム</span>
              <span>
                <DispTime
                  class="font_size_timer"
                  :prop_disp_time="dispPreset[0][1]"
                />
              </span>
            </div>
            <div class="lap_num">
              <span class="name_time">ラップ数</span>
              <span>
                <DispLap
                  class="font_size_timer"
                  :prop_disp_lap="dispPreset[0][2]"
                />
              </span>
            </div>
          </div>
          <!-- プリセット2 -->
          <div class="preset2" v-if="isPreset2">
            <div class="work_time">
              <span class="name_time">ワークタイム</span>
              <span>
                <DispTime
                  class="font_size_timer"
                  :prop_disp_time="dispPreset[1][0]"
                />
              </span>
            </div>
            <div class="chill_time">
              <span class="name_time">ちるタイム</span>
              <span>
                <DispTime
                  class="font_size_timer"
                  :prop_disp_time="dispPreset[1][1]"
                />
              </span>
            </div>
            <div class="lap_num">
              <span class="name_time">ラップ数</span>
              <span>
                <DispLap
                  class="font_size_timer"
                  :prop_disp_lap="dispPreset[1][2]"
                />
              </span>
            </div>
          </div>
          <!-- プリセット3 -->
          <div class="preset3" v-if="isPreset3">
            <div class="work_time">
              <span class="name_time">ワークタイム</span>
              <span>
                <DispTime
                  class="font_size_timer"
                  :prop_disp_time="dispPreset[2][0]"
                />
              </span>
            </div>
            <div class="chill_time">
              <span class="name_time">ちるタイム</span>
              <span>
                <DispTime
                  class="font_size_timer"
                  :prop_disp_time="dispPreset[2][1]"
                />
              </span>
            </div>
            <div class="lap_num">
              <span class="name_time">ラップ数</span>
              <span>
                <DispLap
                  class="font_size_timer"
                  :prop_disp_lap="dispPreset[2][2]"
                />
              </span>
            </div>
          </div>
        </div>
        <!-- 編集モード -->
        <div class="edit_mode" v-if="edit_time_now">
          <!-- プリセット1 -->
          <div class="preset1" v-if="isPreset1">
            <!-- 集中時間 -->
            <div class="work_time_select work_time">
              <span class="name_time">ワークタイム</span>
              <span>
                <SelectTime
                  class="font_size_timer"
                  :prop_select_time="dispPreset[0][0]"
                  :prop_index_num="2"
                  :prop_index1="0"
                  :prop_index2="0"
                  @emit_event="change_time"
                />
              </span>
            </div>
            <!-- 休憩時間 -->
            <div class="chill_time_select chill_time">
              <span class="name_time">ちるタイム</span>
              <span>
                <SelectTime
                  class="font_size_timer"
                  :prop_select_time="dispPreset[0][1]"
                  :prop_index_num="2"
                  :prop_index1="0"
                  :prop_index2="1"
                  @emit_event="change_time"
                />
              </span>
            </div>
            <!-- 周回数 -->
            <div class="lap_num_select lap_num">
              <span class="name_time">ラップ数</span>
              <span>
                <SelectLap
                  class="font_size_timer"
                  :prop_select_lap="dispPreset[0][2]"
                  :prop_index="0"
                  @emit_event_lap="change_lap"
                />
              </span>
            </div>
          </div>
          <!-- プリセット2 -->
          <div class="preset2" v-if="isPreset2">
            <!-- 集中時間 -->
            <div class="work_time_select work_time">
              <span class="name_time">ワークタイム</span>
              <span>
                <SelectTime
                  class="font_size_timer"
                  :prop_select_time="dispPreset[1][0]"
                  :prop_index_num="2"
                  :prop_index1="1"
                  :prop_index2="0"
                  @emit_event="change_time"
                />
              </span>
            </div>
            <!-- 休憩時間 -->
            <div class="chill_time_select chill_time">
              <span class="name_time">ちるタイム</span>
              <span>
                <SelectTime
                  class="font_size_timer"
                  :prop_select_time="dispPreset[1][1]"
                  :prop_index_num="2"
                  :prop_index1="1"
                  :prop_index2="1"
                  @emit_event="change_time"
                />
              </span>
            </div>
            <!-- 周回数 -->
            <div class="lap_num_select lap_num">
              <span class="name_time">ラップ数</span>
              <span>
                <SelectLap
                  class="font_size_timer"
                  :prop_select_lap="dispPreset[1][2]"
                  :prop_index="1"
                  @emit_event_lap="change_lap"
                />
              </span>
            </div>
          </div>
          <!-- プリセット3 -->
          <div class="preset3" v-if="isPreset3">
            <!-- 集中時間 -->
            <div class="work_time_select work_time">
              <span class="name_time">ワークタイム</span>
              <span>
                <SelectTime
                  class="font_size_timer"
                  :prop_select_time="dispPreset[2][0]"
                  :prop_index_num="2"
                  :prop_index1="2"
                  :prop_index2="0"
                  @emit_event="change_time"
                />
              </span>
            </div>
            <!-- 休憩時間 -->
            <div class="chill_time_selec chill_time">
              <span class="name_time">ちるタイム</span>
              <span>
                <SelectTime
                  class="font_size_timer"
                  :prop_select_time="dispPreset[2][1]"
                  :prop_index_num="2"
                  :prop_index1="2"
                  :prop_index2="1"
                  @emit_event="change_time"
                />
              </span>
            </div>
            <!-- 周回数 -->
            <div class="lap_num_select lap_num">
              <span class="name_time">ラップ数</span>
              <span>
                <SelectLap
                  class="font_size_timer"
                  :prop_select_lap="dispPreset[2][2]"
                  :prop_index="2"
                  @emit_event_lap="change_lap"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DispTime from "../../Disp/DispTime.vue"
import DispLap from "../../Disp/DispLap.vue"
import SelectTime from "../../Select/SelectTime.vue"
import SelectLap from "../../Select/SelectLap.vue"

export default {
  components: {
    DispTime,
    DispLap,
    SelectTime,
    SelectLap,
  },

  data: function () {
    return {
      // 表示・編集モード切り替え
      edit_time_now: false,

      // プリセット編集前を保存しておく
      temp: null,

      // 選択肢
      presets: [
        { id: 1, label: "プリセット1" },
        { id: 2, label: "プリセット2" },
        { id: 3, label: "プリセット3" },
      ],
      // 初期はプリセット1を表示
      selectedPreset: 1,

      // 表示・編集用の配列
      dispPreset: null,
    }
  },

  props: {
    props_preset: { Type: Array },
  },

  created: function () {
    // ストアからプリセットデータを受け取る
    console.log("presets")
    this.dispPreset = JSON.parse(JSON.stringify(this.props_preset))
  },

  methods: {
    // プリセット編集モード
    edit_time: function () {
      this.edit_time_now = true
      this.temp = JSON.parse(JSON.stringify(this.dispPreset))
    },

    // プリセットセーブ
    save_edited_time: function () {
      this.toStore()
      this.temp = null
      this.edit_time_now = false
    },

    // プリセットリセット
    reset_edited_time: function () {
      this.dispPreset = JSON.parse(JSON.stringify(this.temp))
    },

    // プリセットキャンセル
    cancel_edited_time: function () {
      this.reset_edited_time()
      this.temp = null
      this.edit_time_now = false
    },

    // 変更をストアとデータベースに反映
    toStore: function () {
      this.$emit("emit_data", this.dispPreset)
    },

    // セレクトコンポーネントからの変更を反映させる
    change_time(prop_index1, prop_index2, temp) {
      this.dispPreset[prop_index1][prop_index2] = JSON.parse(
        JSON.stringify(temp)
      )
    },
    change_lap(prop_index, selectedLap) {
      this.dispPreset[prop_index][2] = JSON.parse(JSON.stringify(selectedLap))
    },
  },

  computed: {
    isPreset1() {
      return this.selectedPreset === 1
    },
    isPreset2() {
      return this.selectedPreset === 2
    },
    isPreset3() {
      return this.selectedPreset === 3
    },
  },
}
</script>

<style scoped>
.content {
  width: 100%;
  background-color: white;
}
.disp_flame {
  width: 100%;
  /* background-color: white; */
  display: inline-block;
  inline-size: 100%;
}
.head_box {
  display: flex;
  justify-content: left;
  align-items: flex-end;
  text-align: center;
  margin-top: 2%;
  margin-left: 2%;
}
.select_disp_preset_num {
  display: inherit;
  background-color: var(--bg-button-gray);
  border-radius: 5%/20%;
  height: 3rem;
  margin-right: 5%;
}
.select_disp_preset_num select {
  background-color: var(--bg-button-gray);
  border-top: none;
  border-bottom: none;
  border-left: none;
  border-right: none;
  appearance: none;
  border-radius: 5%/20%;
}
.select_edit_box {
  display: flex;
  gap: 5%;
  height: 3rem;
}
.flex_input {
  display: flex;
  font-size: 150%;
}
.input_button_edit {
  background-color: var(--bg-button-gray);
  border-radius: 5%/30%;
}
.input_button_save {
  background-color: var(--bg-button-gray);
  border-radius: 5%/30%;
}
.input_button_reset {
  background-color: var(--bg-button-gray);
  border-radius: 5%/30%;
}
.input_button_cancel {
  background-color: var(--bg-button-gray);
  border-radius: 5%/30%;
}
.arrow {
  left: 5%;
}
.ri-arrow-down-s-fill {
  position: relative;
  left: -10%;
  top: 0%;
}
.select_edit_box input {
  background-color: var(--bg-button-gray);
  border-top: none;
  border-bottom: none;
  border-left: none;
  border-right: none;
  appearance: none;
  border-radius: 5%/30%;
  margin: 5%;
  font-size: 50%;
}
.center_box {
  color: var(--text-deeper-green);
}
.work_time {
  display: flex;
  justify-content: left;
  align-items: center;
  text-align: center;
}
.chill_time {
  display: flex;
  justify-content: left;
  align-items: center;
  text-align: center;
}
.lap_num {
  display: flex;
  justify-content: left;
  align-items: center;
  text-align: center;
}
.font_size_timer {
  font-size: 200%;
  inline-size: 100%;
  white-space: nowrap;
  background-color: white;
}
.name_time {
  white-space: nowrap;
  width: 40%;
  justify-items: left;
  text-align: center;
  align-content: center;
}
</style>
