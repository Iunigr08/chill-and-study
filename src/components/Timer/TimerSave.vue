<template>
  <div class="all">
    <div class="content-header">
      <div class="wrap-items">
        <h2 class="title">計測タイムの保存</h2>
        <div class="icon-close" @click="togglePopup">
          <i class="ri-close-line"></i>
        </div>
      </div>
    </div>
    <div class="top">
      <!-- 合計ワークタイム -->
      <div class="sumtime">
        <h3 class="title">合計ワークタイム</h3>
        <div class="sumtime_screen">
          <DispTime :prop_disp_time="sum_time" />
        </div>
      </div>
      <!-- カラータグ選択 -->
      <div class="color_tag">
        <h3 class="title">ワークタグ</h3>
        <div class="radio_buttom_glope">
          <input
            type="radio"
            v-model="v_radio"
            class="color_radio"
            id="red"
            name="tag_radio"
            value="1"
          />
          <label for="red"></label>
          <input
            type="radio"
            v-model="v_radio"
            class="color_radio"
            id="green"
            name="tag_radio"
            value="2"
          />
          <label for="green"></label>
          <input
            type="radio"
            v-model="v_radio"
            class="color_radio"
            id="blue"
            name="tag_radio"
            value="3"
          />
          <label for="blue"></label>
          <input
            type="radio"
            v-model="v_radio"
            class="color_radio"
            id="orange"
            name="tag_radio"
            value="4"
          />
          <label for="orange"></label>
          <input
            type="radio"
            v-model="v_radio"
            class="color_radio"
            id="purple"
            name="tag_radio"
            value="5"
          />
          <label for="purple"></label>
          <input
            type="radio"
            v-model="v_radio"
            class="color_radio"
            id="gray"
            name="tag_radio"
            value="6"
          />
          <label for="gray"></label>
        </div>
      </div>
      <div class="lap_time">
        <h3 class="title">活動詳細</h3>
        <div class="edit_buttom">
          <div v-if="v_edit_time === false">
            <div class="edit_buttom_place">
              <input
                type="button"
                value="記録を編集"
                class="edit_buttom_select"
                @click="edit_time"
              />
            </div>
          </div>
          <div v-if="v_edit_time === true">
            <div class="edit_buttom_place2">
              <div class="edit_buttom_C">
                <input
                  type="button"
                  value="決定"
                  class="edit_buttom_select"
                  @click="edit_time_ok"
                />
              </div>
              <div class="edit_buttom_C">
                <input
                  type="button"
                  value="最初に戻す"
                  class="edit_buttom_select"
                  @click="edit_time_reset"
                />
              </div>
              <div class="edit_buttom_C">
                <input
                  type="button"
                  value="キャンセル"
                  class="edit_buttom_select"
                  @click="edit_time_cancel"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="time_scroll scrollbar scrollbar-thumb-rounded scrollbar-thumb-black scrollbar-track"
        >
          <!-- 表示モード -->
          <div v-if="v_edit_time === false" class="time_scroll_inner">
            <div v-for="(item, i) in time" :key="i" class="time-scroll-blocks">
              <!-- ラップ数表示 -->
              <p>{{ i + 1 }}st ラップ</p>
              <!-- 集中時間 -->
              <div class="scroll_br">
                <div class="scroll_cont">
                  <div><DispTime :prop_disp_time="item[0]" /></div>
                </div>
                <p class="arrow">→</p>
                <!-- 休憩時間 -->
                <div class="scroll_cont">
                  <div v-if="item[1] !== null">
                    <DispTime :prop_disp_time="item[1]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 編集モード-->
          <div v-if="v_edit_time === true" class="time_scroll_inner">
            <div v-for="(item, i) in time" :key="i" class="time-scroll-blocks">
              <!-- ラップ数表示 -->
              <p>{{ i + 1 }}st ラップ</p>
              <!-- 集中時間 -->
              <div class="scroll_br">
                <div class="scroll_cont">
                  <SelectTime
                    :prop_select_time="edit_time_buf[i][0]"
                    :prop_index_num="2"
                    :prop_index1="i"
                    :prop_index2="0"
                    @emit_event="chenge_time"
                  />
                </div>
                <div class="arrow">→</div>
                <!-- 休憩時間 -->
                <div v-if="item[1] !== null" class="scroll_cont">
                  <SelectTime
                    :prop_select_time="edit_time_buf[i][1]"
                    :prop_index_num="2"
                    :prop_index1="i"
                    :prop_index2="1"
                    @emit_event="chenge_time"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- メモ -->
    <div class="memo">
      <!-- 文字サイズを上げる -->
      <h3 class="title">作業メモ</h3>
      <textarea
        v-model="v_memo"
        name="memo_box"
        class="memo_text_box"
      ></textarea>
    </div>
    <!-- 送信ボタン -->
    <div class="submit">
      <input
        @click="submit"
        type="button"
        value="記録する"
        class="submit_button"
      />
    </div>
  </div>
</template>

<script>
import DispTime from "../Disp/DispTime.vue"
import SelectTime from "../Select/SelectTime.vue"

export default {
  components: { DispTime, SelectTime },
  data: function () {
    return {
      //合計時間表示用
      sum_time: [0, 0, 0],
      //時間表示/編集切り替え
      v_edit_time: false,
      edit_commit: true,
      //受け取ったデータ表示
      time: [],
      lap: null,
      //時間編集中のデータ置き場
      edit_time_buf: [],
      //リセット用時間バッファ
      reset_time_buf: [],
      //送信用データ
      send_data: {},
      //メモの文字列読み取り用
      v_memo: "",
      //ラジオボタン読み取り用
      v_radio: "6",
    }
  },
  props: {
    //タイマーモジュールによる表示切替
    togglePopup: Function,
    //時間を受け取る
    result_time: { type: Array, required: true },
    //ラップを受け取る
    received_lap: { type: Number, required: true },
  },
  created: function () {
    //時間表示処理
    //結合時はここをpropからもらった値に変更する
    this.time = JSON.parse(JSON.stringify(this.result_time))
    this.lap = JSON.parse(JSON.stringify(this.received_lap))
    //ここまでテストデータ
    this.reset_time_buf = this.time
    this.time_view()
  },
  methods: {
    //時間編集ボタン処理
    edit_time: function () {
      if (this.v_edit_time) {
        if (this.edit_commit) {
          console.log("ok")
          //編集用データから元データに複製
          this.time = JSON.parse(JSON.stringify(this.edit_time_buf))
        } else {
          console.log("cancel")
        }
        this.v_edit_time = false
        this.time_view()
      } else {
        //元データから編集用データに複製
        this.edit_time_buf = JSON.parse(JSON.stringify(this.time))
        this.v_edit_time = true
      }
    },
    edit_time_reset: function () {
      this.edit_time_buf = JSON.parse(JSON.stringify(this.reset_time_buf))
    },
    edit_time_ok: function () {
      this.edit_commit = true
      this.edit_time()
    },
    edit_time_cancel: function () {
      this.edit_commit = false
      this.edit_time()
    },
    //ボタン処理
    submit: function () {
      //データを作る
      //編集中に送信ボタンが押されたときに警告を出す
      if (!this.v_edit_time) {
        this.formated_send_data()
        console.log(this.send_data)
        var result = window.confirm("この内容で保存しますか。")
        if (result) {
          //データを送信
          this.$store.dispatch("syncuploadnewwork", {
            new_data: this.send_data,
          })
          this.$store.commit("setSaveWork", this.send_data)
          //画面を消す
          this.togglePopup()
        } else {
          console.log("cancel")
        }
      } else {
        // alert("計測時間の歯車を押して編集モードを解除してください")
        alert("「活動詳細」欄の編集を終了してください")
      }
    },
    //時刻表示処理
    time_view: function () {
      // 合計時間算出
      var sum = [0, 0, 0]
      for (let i = 2; i >= 0; i--) {
        for (let lap_count = 0; lap_count < this.lap; lap_count++) {
          sum[i] += this.time[lap_count][0][i]
          if (i != 0) {
            if (sum[i] > 59) {
              sum[i - 1]++
              sum[i] -= 60
            }
          }
        }
      }
      console.log("after")
      console.log(sum)
      //合計時間出力
      this.sum_time = sum
    },
    //送信データ作成
    formated_send_data: function () {
      //送信用オブジェクト初期化
      this.send_data = {}
      //現在時刻計算
      var now = new Date()
      var date =
        now.getFullYear() +
        ("00" + (now.getMonth() + 1)).slice(-2) +
        ("00" + now.getDate()).slice(-2) +
        ("00" + now.getHours()).slice(-2) +
        ("00" + now.getMinutes()).slice(-2) +
        ("00" + now.getSeconds()).slice(-2)
      //キーに日付追加
      this.send_data = { [date]: null }
      //配列を配列に変換
      var work = []
      for (let j = 0; j < this.lap; j++) {
        var temp = []
        temp[0] = JSON.parse(JSON.stringify(this.time[j][0]))
        temp[1] = JSON.parse(JSON.stringify(this.time[j][1]))
        work.push(temp)
      }
      //各要素のキー作成
      this.send_data[date] = {
        Work: work,
        Memo: this.v_memo,
        ColorTag: this.v_radio,
      }
    },
    chenge_time: function (prop_index1, prop_index2, temp) {
      this.edit_time_buf[prop_index1][prop_index2] = JSON.parse(
        JSON.stringify(temp)
      )
    },
  },
  //ラップ用時間文字列作成
  computed: {
    formated_time: () => (timedata) => {
      return (
        ("00" + timedata[0]).slice(-2) +
        ":" +
        ("00" + timedata[1]).slice(-2) +
        ":" +
        ("00" + timedata[2]).slice(-2)
      )
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
}
.content-header {
  background-color: var(--text-deeper-green);
  padding: 0.4rem 0 0.1rem 0;
  margin-bottom: 2rem;
  border-radius: 1rem 1rem 0 0;
}
.content-header .wrap-items {
  width: calc(100% - 2rem);
  display: flex;
  justify-content: space-between;
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
  padding-left: 0;
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
  grid-row: 2/3;
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
  margin-top: 2rem;
}
.memo_text_box {
  display: grid;
  grid-column: 2/3;
  grid-row: 1/3;
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
  grid-auto-flow: column;
  grid-auto-columns: 50%;
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

  color: var(--text-default-green);
  background-color: var(--bg-gray);
  border: none;
}
.submit_button:hover {
  border: 2px solid transparent;
  background-color: var(--text-deeper-green);
  color: #fff;
  /* background: var(--bg-orange); */
  color: var(--bgcolor);
  background-color: var(--text-default-green);
  border: none;
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
  width: 100%;
  height: 16rem;
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
.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
  border-radius: 6px;
}
/* スクロールバーの色を設定する */
.scrollbar-thumb-black::-webkit-scrollbar-thumb {
  --bg-opacity: 1;
  background-color: var(--text-deeper-green);
  /* background-image: linear-gradient(
    135deg,
    var(--text-deeper-green) 10%,
    var(--text-light-green) 100%
  ); */
}
.scrollbar-track::-webkit-scrollbar-track {
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

.lap_time {
  grid-column: 3/4;
  grid-row: 1/3;
  width: 88%;
}
</style>
