<template>
  <div class="all">
    <div class="content-header">
      <div class="wrap-items">
        <h2 class="title">記録の詳細</h2>
        <div class="group-right">
          <input type="button" value="編集を保存" @click="edit_save_botton" />
          <input type="button" value="この記録を削除" @click="delete_botton" />
          <div class="icon-close">
            <i class="ri-close-line" @click="close_botton"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="top">
      <div class="sumtime sumtime1">
        <h3 class="title">合計ワークタイム</h3>
        <div class="sumtime_screen">
          <DispTimeAnother :prop_disp_time_another="sum_work_time_data" />
        </div>
      </div>
      <div class="sumtime sumtime2">
        <h3 class="title">合計チルタイム</h3>
        <div class="sumtime_screen">
          <DispTimeAnother :prop_disp_time_another="sum_chill_time_data" />
        </div>
      </div>
      <!-- カラータグ選択 -->
      <div class="color_tag">
        <h3 class="title">ワークタグ</h3>
        <div class="radio_buttom_glope">
          <input
            type="radio"
            v-model="disp_color_tag"
            class="color_radio"
            id="red"
            name="tag_radio"
            value="1"
          />
          <label for="red"></label>
          <input
            type="radio"
            v-model="disp_color_tag"
            class="color_radio"
            id="green"
            name="tag_radio"
            value="2"
          />
          <label for="green"></label>
          <input
            type="radio"
            v-model="disp_color_tag"
            class="color_radio"
            id="blue"
            name="tag_radio"
            value="3"
          />
          <label for="blue"></label>
          <input
            type="radio"
            v-model="disp_color_tag"
            class="color_radio"
            id="orange"
            name="tag_radio"
            value="4"
          />
          <label for="orange"></label>
          <input
            type="radio"
            v-model="disp_color_tag"
            class="color_radio"
            id="purple"
            name="tag_radio"
            value="5"
          />
          <label for="purple"></label>
          <input
            type="radio"
            v-model="disp_color_tag"
            class="color_radio"
            id="gray"
            name="tag_radio"
            value="6"
          />
          <label for="gray"></label>
        </div>
      </div>
      <div class="lap_time">
        <div class="lap_time_inner">
          <h3 class="title">活動詳細</h3>
          <div class="time_scroll scrollbar">
            <div class="time_scroll_inner">
              <div
                v-for="(item, i) in disp_time_data"
                :key="i"
                class="time-scroll-blocks"
              >
                <!-- ラップ数表示 -->
                <p>{{ i + 1 }}st ラップ</p>
                <!-- 集中時間 -->
                <div class="scroll_bar">
                  <div class="scroll_cont">
                    <div>
                      <DispTimeAnother :prop_disp_time_another="item[0]" />
                    </div>
                  </div>
                  <p class="arrow">→</p>
                  <!-- 休憩時間 -->
                  <div class="scroll_cont">
                    <div v-if="item[1] !== null">
                      <DispTimeAnother :prop_disp_time_another="item[1]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="memo">
      <h3 class="title">作業メモ</h3>
      <textarea v-model="disp_memo_data" class="memo_text_box"></textarea>
    </div>
  </div>
</template>

<script>
import DispTimeAnother from "./Disp/DispTimeAnother.vue"

export default {
  components: {
    DispTimeAnother,
  },
  //
  data: function () {
    return {
      // 受けとったpropsのデータをコピーする配列
      copyDate: null,
      copyData: {},

      // 表示する日付データ配列
      dateArray: [],

      // 表示するカラータグ
      disp_color_tag: "",

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
    togglePopup: Function,
    props_edit_date: { type: String },
    props_edit_data: { type: Object },
  },

  created: function () {
    // 仮データをコピー
    // this.copyDate = this.getTempDate()
    // this.copyData = this.getTempData()
    this.copyDate = JSON.parse(JSON.stringify(this.props_edit_date))
    this.copyData = JSON.parse(JSON.stringify(this.props_edit_data))

    // 受け取ったデータを小分けにする関数
    this.div_data()

    // 合計時間を計算
    this.sum_time()
  },
  methods: {
    //データ処理
    getTempDate: function () {
      let tempDate = "20220715212030"
      return JSON.parse(JSON.stringify(tempDate))
    },
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
    //ボタン回り
    //編集ボタン
    edit_save_botton: function () {
      console.log("save")
      let new_data = {
        ColorTag: this.disp_color_tag,
        Memo: this.disp_memo_data,
      }
      this.$store.commit("updateStoreWork", {
        edit_date: this.copyDate,
        new_data: new_data,
      })
      this.$store.dispatch("synceditwork", {
        edit_date: this.copyDate,
        new_data: new_data,
      })
      this.$emit("emit_update_data")
      alert("変更を保存しました")
    },
    //削除ボタン
    delete_botton: function () {
      console.log("delete")
      if (window.confirm("本当に削除しますか。")) {
        this.$store.commit("deleteStoreWork", this.copyDate)
        this.$store.dispatch("syncdeletework", { delete_date: this.copyDate })
        this.$emit("emit_update_data")
        this.togglePopup()
      }
    },
    //閉じるボタン
    close_botton: function () {
      console.log("close")
      this.togglePopup()
    },
  },
}
</script>

<style scoped>
/*表示領域全体*/
.all {
  width: 100%;
  /* margin: 20px 10px 10px 5px; */
  border-radius: 1rem 1rem 0 0;
  background: var(--bg-white);
  letter-spacing: 1px;

  /* 影付け */
  /* box-shadow: 0px 8px 16px -2px rgba(10, 10, 10, 0.1),
    0px 0px 10px 14px rgba(0, 0, 0, 0.039); */
  /* box-shadow: 0px 8px 16px -2px rgba(10, 10, 10, 0.1),
    0px 0px 10px 14px rgba(0, 0, 0, 0.07); */
  box-shadow: var(--box-shadow);
  overflow-y: scroll;
}
.content-header {
  background-color: var(--text-deeper-green);
  padding: 0.4rem 0 0.1rem 0;
  padding: 0.6rem 0 0.6rem 0;
  margin-bottom: 2rem;
  border-radius: 1rem 1rem 0 0;
}
.content-header .wrap-items {
  width: calc(100% - 2rem);
  display: flex;
  justify-content: space-between;
}
.content-header .wrap-items .title {
  width: 30%;
}
.group-right {
  width: 60%;
  display: flex;
  justify-content: flex-end;
  gap: 6rem;
}
.group-right input {
  padding: 0 2rem;
  margin: 0.3rem 0;
  color: var(--text-deeper-green);
  border: none;
  border-radius: 3px;
  background: var(--bgcolor);
  transition: 0.2s;
}
.group-right input:nth-child(2) {
  border: 2px solid var(--bgcolor);
  background: transparent;
  color: var(--bgcolor);
}
.group-right input:hover {
  background: var(--bg-gray);
}
.group-right input:nth-child(2):hover {
  border: 2px solid transparent;
  background: var(--bgcolor);
  color: var(--text-deeper-green);
}
.icon-close {
  color: #ffffff;
  font-size: 2.6rem;
  cursor: pointer;
}
.icon-close i {
  border-radius: 3px;
  transition: 0.2s;
}
.icon-close i:hover {
  background: var(--bg-light-gray-alpha);
}
/* .sumtime {
  height: 10rem;
  width: 50%;
  display: grid;
  grid-column: 1/3;
  grid-row: 1/4;
} */
.title {
  font-size: 1.8rem;
  height: 3rem;
  font-weight: 400;
  padding-left: 2rem;
}
h2.title {
  color: var(--bgcolor);
  margin-top: 0.2rem;
}
.lap_time .title {
  grid-template-rows: 1/2;
  padding-left: 0;
}
.lap_time {
  grid-column: 3/4;
  grid-row: 1/4;
  width: 88%;
  height: 100%;
}
.lap_time_inner {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 7rem 1fr;
  grid-auto-flow: column;
  height: 100%;
}
.memo .title {
  width: 8rem;
  margin: auto;
  padding: 0;
}

.sumtime_screen {
  font-size: 3.2rem;
  /* padding: 0 30% 0 0; */
  padding-left: 5rem;
  color: var(--text-deeper-green);
}
.color_tag {
  /* height: 12rem; */
  width: 50%;
  display: grid;
  grid-column: 1/2;
  grid-row: 3/4;
}
.radio_buttom_glope {
  display: grid;
  grid-template-columns: 10rem 10rem;
  /* width: 15rem; */
  width: 60%;
  height: 8rem;
  /* border: 0.2rem solid #225; */
  gap: 15%;
  padding-left: 5rem;
  /* margin: 0 auto; */
  /* margin-left: 3rem; */
}
.radio_buttom_glope input,
.radio_buttom_glope label {
  box-sizing: border-box;
}
.radio_buttom_glope input + label {
  border: 2px solid transparent;
  border-radius: 4rem;
  transition: 0.3s;
  cursor: pointer;
}

input[type="radio"] {
  display: none; /* ラジオボタンを非表示にする */
}

input[value="1"] + label {
  background: #ffc0c0; /* マウス選択時の背景色を指定する */
}
input[value="2"] + label {
  background: #beffbe; /* マウス選択時の背景色を指定する */
}
input[value="3"] + label {
  background: #c1d1ff; /* マウス選択時の背景色を指定する */
}
input[value="4"] + label {
  background: #ffe1a9; /* マウス選択時の背景色を指定する */
}
input[value="5"] + label {
  background: #e7c6f7; /* マウス選択時の背景色を指定する */
}
input[value="6"] + label {
  background: #c0c0c0; /* マウス選択時の背景色を指定する */
}

input:checked + label {
  /* border: solid 2px #00000035; */
  border-radius: 0.2rem;
}
input[value="1"]:checked + label {
  background: #ff3333; /* マウス選択時の背景色を指定する */
}
input[value="2"]:checked + label {
  background: #2dff2d; /* マウス選択時の背景色を指定する */
}
input[value="3"]:checked + label {
  background: #1a50f0; /* マウス選択時の背景色を指定する */
}
input[value="4"]:checked + label {
  background: #ff9b18; /* マウス選択時の背景色を指定する */
}
input[value="5"]:checked + label {
  background: #a808f8; /* マウス選択時の背景色を指定する */
}
input[value="6"]:checked + label {
  background: #5a5a5a; /* マウス選択時の背景色を指定する */
}

input[value="1"]:hover + label {
  background: #fd7171; /* マウス選択時の背景色を指定する */
}
input[value="3"]:hover + label {
  background: #5e84f5; /* マウス選択時の背景色を指定する */
}
input[value="2"]:hover + label {
  background: #80f180; /* マウス選択時の背景色を指定する */
}
input[value="4"]:hover + label {
  background: #ffb758; /* マウス選択時の背景色を指定する */
}
input[value="5"]:hover + label {
  background: #cf6eff; /* マウス選択時の背景色を指定する */
}
input[value="6"]:hover + label {
  background: #8d8d8d; /* マウス選択時の背景色を指定する */
}

.label {
  margin: 5px; /* ラベル外側の余白を指定する */
  border: 0.2px solid #006dd9; /* ラベルの境界線を実線で指定する */
}

.color_radio {
  border: 0.2px solid #006dd9; /* ラベルの境界線を実線で指定する */
}

.color_tag {
  border: #225;
  margin: right;
  width: 100%;
}

.memo {
  width: 100%;
  margin-top: 4rem;
  padding-bottom: 5rem;
}
.memo_text_box {
  display: grid;
  /* grid-column: 2/3; */
  /* grid-row: 1/4; */
  color: #ffffff;
  font-size: 1.6rem;
  width: 70%;
  height: 20rem;
  padding: 2rem;
  background-color: var(--text-deeper-green);
  margin: 0 auto;
  border-radius: 6px;
  line-height: 1.6;
  /* letter-spacing: 1.2px; */
  box-sizing: border-box;
  overflow: scroll;
}
.memo_text_box:focus {
  outline: none;
}

.top {
  display: grid;
  /* grid-template-columns: repeat(2, 1fr); */
  grid-template-columns: 4fr 4% 5fr;
  grid-template-rows: repeat(3, 1fr);
  grid-auto-flow: column;
  /* grid-auto-columns: 50%; */
  width: 100%;
  /* grid-template-columns: 50% 50%; */
  /* grid-template-rows: 50% 50%; */
}

.submit {
  /* 上のテキストボックスとのマージン */
  margin-top: 3rem;
  /* padding: コンテンツ自体の高さを調整(marginだと重なってて効かない) */
  padding-bottom: 3rem;
  text-align: center;
}

.submit_button {
  height: 3rem;
  /* width: 10rem; */
  /* margin-right: 2rem; */
  padding: 0 2rem;
  color: var(--text-deeper-green);
  background: transparent;
  border: 2px solid var(--text-deeper-green);
  /* border: none; */
  border-radius: 4px;
  cursor: pointer;
  letter-spacing: 1px;
  box-sizing: border-box;
  transition: 0.2s;
}
.submit_button:hover {
  border: 2px solid transparent;
  background-color: var(--text-deeper-green);
  color: #fff;
  /* background: var(--bg-orange); */
}
.edit_buttom_select {
  height: 3rem;
  padding: 0 2rem;
  padding: 0 1.6rem;
  /* border: none; */
  /* color: #fff; */
  color: var(--text-deeper-green);
  /* background-color: var(--text-deeper-green); */
  background: transparent;
  border: 2px solid var(--text-deeper-green);
  /* border: none; */
  border-radius: 4px;
  cursor: pointer;
  letter-spacing: 1px;
  box-sizing: border-box;
  transition: 0.2s;
}
.edit_buttom_select:hover {
  border: 2px solid transparent;
  background-color: var(--text-deeper-green);
  color: #fff;
  /* background: var(--bg-orange); */
}

.time_scroll {
  grid-row: 2/3;
  width: 90%;
  /* height: 16rem; */
  height: 25.6rem;
  overflow-y: scroll;
  background: #fff;
  border-radius: 5px;
  border: 2px solid var(--text-deeper-green);
  /* display: grid; */
  /* grid-column: 2/3; */
  /* grid-row: 1/3; */

  /* width: 90%; */
  /* margin-left: 8%; */
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
.time_scroll_inner {
  width: 95%;
  margin: 0 auto;
}
.time-scroll-blocks {
  margin-bottom: 2rem;
}

.scroll_br {
  display: flex;
  /* justify-content: space-between; */
  gap: 4rem;
  margin-left: 1rem;
}

.arrow {
  font-size: 2rem;
}
.edit_buttom {
  width: 100%;
  margin-bottom: 2rem;
}

.edit_buttom_place {
  text-align: right;
}

.edit_buttom_place2 {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin-left: 10%;
}
</style>
