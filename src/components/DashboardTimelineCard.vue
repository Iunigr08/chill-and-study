<template>
  <!-- 外枠 -->
  <div class="outline">
    <div class="card">
      <div class="head">
        <!-- カラータグ表示 -->
        <div class="disp_color_tag"></div>
        <!-- 編集ボタン表示 -->
        <div class="disp_edit_box">
          <button class="disp_edit_button" @click="push_edit_button">
            詳細を表示
          </button>
        </div>
      </div>
      <div class="center">
        <!-- 日付・時間表示 -->
        <div class="disp_dating">
          <!-- 日付表示 -->
          <div class="disp_date_box">
            <span>{{ dateArray[2] }}</span>
            <span>/</span>
            <span>{{ dateArray[3] }}</span>
          </div>
          <!-- 時間表示 -->
          <div class="disp_time_box">
            <span>{{ dateArray[4] }}</span>
            <span>:</span>
            <span>{{ dateArray[5] }}</span>
          </div>
        </div>
      </div>
      <div class="bottom">
        <!-- 合計時間表示 -->
        <div class="disp_sum_time">
          <!-- 合計集中時間表示 -->
          <div class="disp_worktime">
            <span>合計 集中タイム</span>
            <DispTimeAnother
              :prop_disp_time_another="this.sum_work_time_data"
            />
          </div>
          <!-- 合計ちる時間表示 -->
          <div class="disp_chilltime">
            <span>合計 ちるタイム</span>
            <DispTimeAnother
              :prop_disp_time_another="this.sum_chill_time_data"
            />
          </div>
        </div>
        <div class="disp_memo_box">
          <!-- メモを表示 -->
          <div class="disp_memo">
            <textarea
              class="scrollbar"
              v-model="disp_memo_data"
              cols="30"
              rows="5"
              readonly
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DispTimeAnother from "./Disp/DispTimeAnother.vue"

export default {
  components: {
    DispTimeAnother,
  },

  data: function () {
    return {
      // 受けとったpropsのデータをコピーする配列
      copyDate: null,
      copyData: {},

      // 表示する日付データ配列
      dateArray: [],

      // カラー指定用配列
      color_array: [
        "var(--tag-red)",
        "var(--tag-blue)",
        "var(--tag-green)",
        "var(--tag-yellow)",
        "var(--tag-purple)",
        "var(--tag-gray)",
      ],

      // 表示するメモ
      disp_memo_data: "",

      // 表示するworkデータ
      disp_time_data: [],

      // 合計時間用配列(0:時間, 1:分, 2:秒)
      sum_work_time_data: [],
      sum_chill_time_data: [],
    }
  },

  props: {
    props_card_date: { type: String },
    props_card_data: { type: Object },
  },

  created: function () {
    // 仮データをコピー
    // this.copyDate = this.getTempDate()
    // this.copyData = this.getTempData()
    this.copyDate = JSON.parse(JSON.stringify(this.props_card_date))
    this.copyData = JSON.parse(JSON.stringify(this.props_card_data))

    // 受け取ったデータを小分けにする関数
    this.div_data()

    // 合計時間を計算
    this.sum_time()
  },

  methods: {
    // 仮日付データを取得する
    getTempDate: function () {
      let tempDate = "20220715212030"
      return JSON.parse(JSON.stringify(tempDate))
    },

    // 仮データを取得する
    getTempData: function () {
      let tempData = {
        ColorTag: "6",
        Memo: "今日は共通テストの過去問を解いた。\n1周目は国語を解いた。\n2周目は数学を解いた。\nあしたは物理と化学をやる。",
        Work: [
          [
            [1, 30, 0],
            [0, 30, 0],
          ],
          [[1, 30, 0]],
        ],
      }
      return JSON.parse(JSON.stringify(tempData))
    },

    // 1週間分を追加で要求する
    add: function () {
      this.$emit("emit_more", this.passPreset)
    },

    // 編集ボタンが押されたらemitを発火
    push_edit_button: function () {
      this.$emit("emit_request", this.copyDate)
    },

    // 受け取ったカラータグに応じたcssを適用
    decide_color: function () {
      return this.color_array[this.copyData.ColorTag - 1]
    },

    // 受け取った日付データを小分けにする
    div_data: function () {
      // 日付データ(date)を2つずつに分割
      // index:中身, 0~1:西暦, 2:月, 3:日, 4:時, 5:分, 6:秒
      this.dateArray = this.copyDate.match(/.{2}/g)

      // カラータグをディープコピー
      this.disp_color_tag = JSON.parse(JSON.stringify(this.copyData.ColorTag))

      // メモをディープコピー
      this.disp_memo_data = JSON.parse(JSON.stringify(this.copyData.Memo))

      // 時間データをディープコピー
      this.disp_time_data = JSON.parse(JSON.stringify(this.copyData.Work))
    },

    // 合計時間を算出
    sum_time: function () {
      // 初期化
      this.sum_work_time_data = [0, 0, 0]
      this.sum_chill_time_data = [0, 0, 0]

      // 集中時間の合計を計算
      for (let i = 2; i >= 0; i--) {
        for (
          let lap_count = 0;
          lap_count < this.disp_time_data.length;
          lap_count++
        ) {
          this.sum_work_time_data[i] += this.disp_time_data[lap_count][0][i]
          if (this.disp_time_data[lap_count].length == 2) {
            this.sum_chill_time_data[i] += this.disp_time_data[lap_count][1][i]
          }
          if (i != 0) {
            if (this.sum_work_time_data[i] > 59) {
              this.sum_work_time_data[i - 1]++
              this.sum_work_time_data[i] -= 60
            }
            if (this.sum_chill_time_data[i] > 59) {
              this.sum_chill_time_data[i - 1]++
              this.sum_chill_time_data[i] -= 60
            }
          }
        }
      }
    },
  },

  watch: {
    props_card_data: {
      handler: function () {
        // 初期化のためにcreatedと同じ処理
        this.copyDate = JSON.parse(JSON.stringify(this.props_card_date))
        this.copyData = JSON.parse(JSON.stringify(this.props_card_data))
        this.div_data()
        this.sum_time()
      },
      deep: true,
    },
  },
}
</script>

<style scoped>
.outline {
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
  background-color: white;
  margin-top: 10%;
  /* box-shadow: var(--box-shadow); */
  box-shadow: 0px 10px 5px 0px rgba(10, 10, 10, 0.1),
    0px 0px 0px 1px rgba(10, 10, 10, 0.02);
}
.unit {
  color: var(--text-light-green);
}
.card {
  width: 100%;
  margin-left: 3%;
  margin-right: 3%;
  padding: 1.2rem 2.2rem;
}
.head {
  display: flex;
  justify-content: space-between;
}
.disp_color_tag {
  margin: 1.2rem;
  margin-bottom: 0.6rem;
  height: 1.6rem;
  /* width: 30%; */
  width: 14rem;
  background-color: v-bind("decide_color()");
  border-radius: 10px;
}
.disp_edit_box {
  background-color: var(--text-deeper-green);
  border-radius: 4px;
  width: 20%;
  margin: 2%;
}
.disp_edit_button {
  display: block;
  width: 100%;
  color: white;
  background-color: var(--text-deeper-green);
  padding: 0.3rem 1rem;
  border: none;
  border-radius: 3px;
  appearance: none;
  /* position: relative; */
  /* top: -10%; */
  cursor: pointer;
  transition: 0.2s;
}
.disp_edit_button:hover {
  background: var(--text-default-green);
}
.disp_dating {
  display: flex;
  text-align: left;
  align-items: flex-end;
  margin-left: 3%;
  margin-bottom: 6%;
}
.disp_date_box {
  font-size: 120%;
  margin: 0 2% 0 0;
  color: var(--text-deeper-green);
}
.disp_time_box {
  font-size: 120%;
  color: var(--text-deeper-green);
}
.bottom {
  display: flex;
  margin: 0 0 2% 0;
}
.disp_sum_time {
  width: 40%;
  margin-left: 3%;
  color: var(--text-deeper-green);
}
.disp_sum_time >>> .unit {
  color: var(--text-light-green);
}
.disp_worktime {
  text-align: left;
  margin-bottom: 3%;
}
.disp_worktime span {
  font-size: 90%;
}
.disp_worktime .content {
  font-size: 2.4rem;
  margin-left: 10%;
}
.disp_chilltime {
  text-align: left;
}
.disp_chilltime .content {
  font-size: 2.4rem;
  margin-left: 10%;
}
.disp_chilltime span {
  font-size: 90%;
}
.disp_memo_box {
  width: 80%;
  margin-right: 3%;
}
.disp_memo {
  height: 100%;
  box-sizing: border-box;
}
textarea {
  resize: none;
  border: 3px solid var(--text-deeper-green);
  border-radius: 5px;
  padding: 1rem 2rem;
  font-size: 1.3rem;
  line-height: 200%;
  width: 90%;
  overflow-y: scroll;
}
/* スクロールバーの幅と高さを設定する */
.scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 10px;
  margin-right: 6rem;
}
/* スクロールバーの形を設定する */
.scrollbar::-webkit-scrollbar-thumb {
  border-radius: 6px;
}
/* スクロールバーの色を設定する */
.scrollbar::-webkit-scrollbar-thumb {
  --bg-opacity: 1;
  background-color: var(--text-deeper-green);
  /* background-image: linear-gradient(
    135deg,
    var(--text-deeper-green) 10%,
    var(--text-light-green) 100%
  ); */
}
.scrollbar::-webkit-scrollbar-track {
  background-color: var(--bg-gray);
  border-radius: 10px;
}
textarea:focus {
  outline: none;
}
</style>
