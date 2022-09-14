<template>
  <!-- 外枠 -->
  <div class="outer-content">
    <div class="disp-flame">
      <!-- トップフレーム -->
      <div class="top_flame">
        <!-- タイトル -->
        <div class="top-title">プリセットを編集する</div>
        <!-- プリセット選択枠 -->
        <div class="select-preset-flame">
          <!-- ボタン1 -->
          <button
            class="select-preset-button preset1-button"
            @click="changePreset(0)"
          >
            1
          </button>
          <!-- ボタン2 -->
          <button
            class="select-preset-button preset2-button"
            @click="changePreset(1)"
          >
            2
          </button>
          <!-- ボタン3 -->
          <button
            class="select-preset-button preset3-button"
            @click="changePreset(2)"
          >
            3
          </button>
        </div>
      </div>
      <!-- センター -->
      <div class="disp-time-flame">
        <div class="time-title">
          <span class="title-worktime">ワークタイム</span>
          <span class="title-chilltime">ちるタイム</span>
          <span class="title-lapnum">ラップ数</span>
        </div>
        <div class="disp-time">
          <!-- 集中時間 -->
          <span>
            <SelectTime
              class="select-worktime"
              :prop_select_time="dispPreset[selectedPreset][0]"
              :prop_index_num="2"
              :prop_index1="selectedPreset"
              :prop_index2="0"
              @emit_event="change_time"
            />
          </span>
          <!-- 休憩時間 -->
          <span>
            <SelectTime
              class="select-chilltime"
              :prop_select_time="dispPreset[selectedPreset][1]"
              :prop_index_num="2"
              :prop_index1="selectedPreset"
              :prop_index2="1"
              @emit_event="change_time"
            />
          </span>
          <!-- 周回数 -->
          <span>
            <SelectLap
              class="select-lapnum"
              :prop_select_lap="dispPreset[selectedPreset][2]"
              :prop_index="selectedPreset"
              @emit_event_lap="change_lap"
            />
          </span>
        </div>
      </div>
      <!-- ボトム -->
      <div class="bottom-flame">
        <!-- 保存・リセット・キャンセルボタン -->
        <button class="save-button" @click="saveEditedTime">保存</button>
        <button class="reset-button" @click="resetEditedTime">リセット</button>
      </div>
    </div>
  </div>
</template>

<script>
import SelectTime from "../../Select/SelectTime.vue"
import SelectLap from "../../Select/SelectLap.vue"

export default {
  components: {
    SelectTime,
    SelectLap,
  },

  data: function () {
    return {
      // 表示用の配列
      dispPreset: null,

      // 表示するプリセットの番号
      selectedPreset: 0,

      // 編集前のプリセット用配列
      tempPreset: null,
    }
  },

  // propsでプリセットデータを受け取る
  props: {
    props_preset: { Type: Array },
  },

  created: function () {
    // propsで受け取ったプリセットデータをディープコピーする
    this.dispPreset = JSON.parse(JSON.stringify(this.props_preset))
  },

  methods: {
    // 選択したプリセット番号を反映
    changePreset(n) {
      this.selectedPreset = n
    },

    // セーブ
    saveEditedTime: function () {
      // 保存関数の呼び出し
      this.toStore()
      // 編集前のプリセットデータをコピーしておく
      this.tempPreset = JSON.parse(JSON.stringify(this.dispPreset))
    },

    // リセット
    resetEditedTime: function () {
      this.dispPreset = JSON.parse(JSON.stringify(this.tempPreset))
    },

    // 変更をストアとデータベースに反映
    toStore: function () {
      this.$emit("emit_data", this.dispPreset)
    },

    // セレクトコンポーネントからの変更をそれぞれ反映させる
    change_time(prop_index1, prop_index2, temp) {
      this.dispPreset[prop_index1][prop_index2] = JSON.parse(
        JSON.stringify(temp)
      )
    },
    change_lap(prop_index, selectedLap) {
      this.dispPreset[prop_index][2] = JSON.parse(JSON.stringify(selectedLap))
    },

    // プリセットボタンの色を動的に変更する
    preset_button1_bgcolor: function () {
      if (this.selectedPreset == 0) {
        return "var(--text-default-green)"
      } else {
        return "white"
      }
    },
    preset_button1_color: function () {
      if (this.selectedPreset == 0) {
        return "white"
      } else {
        return "var(--text-default-green)"
      }
    },
    preset_button2_bgcolor: function () {
      if (this.selectedPreset == 1) {
        return "var(--text-default-green)"
      } else {
        return "white"
      }
    },
    preset_button2_color: function () {
      if (this.selectedPreset == 1) {
        return "white"
      } else {
        return "var(--text-default-green)"
      }
    },
    preset_button3_bgcolor: function () {
      if (this.selectedPreset == 2) {
        return "var(--text-default-green)"
      } else {
        return "white"
      }
    },
    preset_button3_color: function () {
      if (this.selectedPreset == 2) {
        return "white"
      } else {
        return "var(--text-default-green)"
      }
    },
  },
}
</script>

<style scoped>
.outer-content {
  width: 100%;
  background-color: white;
}
.disp-flame {
  padding: 2rem; /* <----後で調節する */
}
.top-title {
  color: var(--text-deeper-green);
  font-weight: bold;
  font-size: 2rem;
  margin: 1rem 0;
}
.select-preset-button {
  appearance: none;
  border: none;
  margin: 1rem;
  border-radius: 15px;
  width: 6rem;
  height: 3rem;
  font-size: 1.8rem;
}
.preset1-button {
  background-color: v-bind("preset_button1_bgcolor()");
  color: v-bind("preset_button1_color()");
}
.preset1-button:hover {
  border: 3px solid var(--text-light-green);
}
.preset2-button {
  background-color: v-bind("preset_button2_bgcolor()");
  color: v-bind("preset_button2_color()");
}
.preset2-button:hover {
  border: 3px solid var(--text-light-green);
}
.preset3-button {
  background-color: v-bind("preset_button3_bgcolor()");
  color: v-bind("preset_button3_color()");
}
.preset3-button:hover {
  border: 3px solid var(--text-light-green);
}
.disp-time-flame {
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  margin: 1em auto;
  font-size: 3rem;
}
.time-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--text-deeper-green);
  margin-right: 5rem;
}
.disp-time {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.disp-time >>> .select-lapnum {
  background-color: white;
}
.bottom-flame {
  margin-top: 3rem;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  gap: 8rem;
}
.save-button {
  color: var(--text-default-green);
  border-radius: 15px;
  border: 2px solid var(--text-default-green);
  width: 10rem;
  padding: 0.2rem 0;
}
.save-button:hover {
  background-color: var(--text-deeper-green);
  color: white;
  transition: 0.4s;
}
.reset-button {
  color: var(--text-default-green);
  border-radius: 15px;
  border: 2px solid var(--text-default-green);
  width: 10rem;
  padding: 0.2rem 0;
}
.reset-button:hover {
  background-color: var(--text-deeper-green);
  color: white;
  transition: 0.4s;
}
</style>
