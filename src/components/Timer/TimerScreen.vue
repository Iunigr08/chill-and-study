<template>
  <!-- 外枠 -->
  <div class="screen_content">
    <!-- ヘッド枠 -->
    <div class="head" v-if="beforeCount || timerOn || timerPause">
      <p class="working" v-if="concentrationTime && !isPoppingup">
        <span>ワーク</span>タイム
      </p>
      <p class="chilling" v-if="!concentrationTime && !isPoppingup">
        <span>ちる</span>タイム
      </p>
    </div>
    <!-- センター枠 -->
    <div class="body_frame">
      <!-- 表示枠 -->
      <div class="disp_box">
        <!-- タイマー枠 -->
        <div class="disp_time_box">
          <DispTime
            :prop_disp_time="dispTime"
            :class="changeColor(this.timerPause)"
          />
        </div>
        <!-- ボタン枠 -->
        <div class="button_box">
          <!-- スタート・ストップ・設定ボタン枠 -->
          <div class="center_box">
            <!-- スタート・ストップ枠 -->
            <div class="start_stop_box">
              <!-- 再生ボタン -->
              <button
                class="start_button func-button"
                @click="startTimer"
                v-if="(beforeCount || timerPause) && !isPoppingup"
              >
                <i class="ri-play-fill play_icon icon"></i>
              </button>
              <!-- 停止ボタン -->
              <button
                class="stop_button func-button"
                @click="stopTimer"
                v-if="timerOn && !timerPause && !isPoppingup"
              >
                <i class="ri-stop-fill stop_icon icon"></i>
              </button>
            </div>
            <!-- 設定ボタン -->
            <div
              class="setting_button"
              v-if="
                this.sumDispTime == 0 ||
                ((beforeSetting || beforeCount || timerPause) && !isPoppingup)
              "
            >
              <!-- タイマー設定画面をポップアップ -->
              <router-link
                :to="{ name: 'TimerSetting' }"
                @click="setTime"
                class="setting-icon"
              >
                <!-- 設定ボタンアイコン -->
                <i
                  class="ri-settings-3-line setting_icon"
                  :class="changeSize(this.beforeSetting, this.beforeCount)"
                ></i>
              </router-link>
            </div>
          </div>
          <!-- リセット&保存ボタン + スキップボタン -->
          <div class="bottom_box">
            <!-- スキップボタン -->
            <button
              class="skip_button"
              @click="skipTimer"
              v-if="timerPause && !isPoppingup && this.concentrationTime"
            >
              ちるタイムへ
            </button>
            <!-- リセットボタン -->
            <button
              class="reset_button func-button"
              @click="resetTimer"
              v-if="timerPause && !isPoppingup"
            >
              リセット
            </button>
            <!-- セーブボタン -->
            <button
              class="save_button func-button"
              @click="saveTime"
              v-if="timerPause && !isPoppingup"
            >
              保存
            </button>
          </div>
        </div>
        <!-- タイマー設定表示枠 -->
        <div class="disp_timer_set" v-if="timerPause && !isPoppingup">
          <div class="inner">
            <div class="left_box">
              <div>ワークタイム</div>
              <div class="space_chilltime">ちるタイム</div>
              <div>ラップ数</div>
            </div>
            <div class="right_box">
              <div><DispTime :prop_disp_time="settedTime[0]" /></div>
              <div class="space_chilltime">
                <DispTime :prop_disp_time="settedTime[1]" />
              </div>
              <div>
                <DispLap :prop_disp_time="settedTime[2]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- タイマー記録画面をポップアップ -->
      <div class="popup-setting" v-if="isPoppingup">
        <TimerSave
          :togglePopup="togglePopup"
          :result_time="passTime"
          :received_lap="lap"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TimerSave from "./TimerSave.vue"
import DispTime from "../Disp/DispTime.vue"
import DispLap from "../Disp/DispLap.vue"

export default {
  components: {
    TimerSave,
    DispTime,
    DispLap,
  },
  data: function () {
    return {
      // 設定されているタイマー(集中・休憩・周回数)
      settedTime: null,

      // 表示される設定時間(集中時間or休憩時間)
      dispTime: null,

      // 計測時間計算で使うやつ
      tempTime: [],

      // 周回数(初期設定は1回) ---> 0の時は無限に繰り返す？(未実装)
      lap: 1,

      // タイマー画面の状況
      beforeSetting: true, // 初期状態(タイマー設定前)
      beforeCount: false, // 計測前状態
      timerOn: false, // 計測状態
      timerPause: false, // 計測中断状態
      start_first_time: true, // スタートボタン童貞

      // 初期に表示されていた時間の合計
      sumDispTime: null, // タイマー設定ボタンの表示に使用

      // タイマー用のオブジェクト(なんか知らんけど)
      timerObj: null,

      // タイマーの状況(集中時間中or休憩時間中)
      concentrationTime: true,

      // 計測時間を記憶
      resultTime: [[], []],

      // 記録した計測時間を送る用の配列
      passTime: [],

      // フォームの答え(yes:true, no:false)
      ans: null,

      isPoppingup: false,

      // タイマー設定から受け取る用配列
      prop_time: [],
    }
  },

  // 表示時間の初期化&プリセットを上書き
  created: function () {
    // 予定されている時間設定(集中時間・休憩時間・周回数)
    this.settedTime = [[0, 0, 0], [0, 0, 0], [0]]

    if (Object.keys(this.$route.query).length) {
      this.prop_time = this.toArray(this.$route.query.prop_time)
      // 受け取った時間設定をsettedTimeにコピー
      this.settedTime = JSON.parse(JSON.stringify(this.prop_time))
    }

    // 集中時間をdispTimeに上書き
    this.dispTime = JSON.parse(JSON.stringify(this.settedTime[0]))

    // 集中時間の合計時間を計算
    this.sumDispTime = this.dispTime[0] + this.dispTime[1] + this.dispTime[2]
    if (this.sumDispTime !== 0) {
      this.beforeCount = true
    }
  },

  methods: {
    // 設定ボタンアイコンのサイズと位置を切り替える
    changeSize: function (state1, state2) {
      // タイマー設定後はサイズが小さい&スタート・ストップボタンの右に
      if (state1 && !state2) {
        return "big_center_setting_icon"
      } else {
        return "small_right_setting_icon"
      }
    },
    changeColor: function (state) {
      if (state) {
        return "timer_color_orange"
      } else if (!this.concentrationTime && this.timerOn) {
        return "timer_color_chill" // chillタイム中の色----------------------------------
      } else {
        return "timer_color_green"
      }
    },
    // クエリで受け取った文字列を配列に変換
    toArray: function (array) {
      let splitted = [[], [], []]
      splitted[0] = array[0].split(",")
      splitted[1] = array[1].split(",")
      splitted[2][0] = array[2]
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
          splitted[i][j] = parseInt(splitted[i][j])
        }
      }
      splitted[2][0] = parseInt(splitted[2][0])

      return splitted
    },

    // カウントダウン関数
    countTimer: function () {
      // 分数が残っていたら
      if (this.dispTime[2] <= 0 && this.dispTime[1] >= 1) {
        this.dispTime[1]--
        this.dispTime[2] = 59
        // 時間が残っていたら
      } else if (this.dispTime[2] <= 0 && this.dispTime[0] >= 1) {
        this.dispTime[0]--
        this.dispTime[1] = 59
        this.dispTime[2] = 59
        // 全てが0になったら
      } else if (
        this.dispTime[2] <= 0 &&
        this.dispTime[1] <= 0 &&
        this.dispTime[0] <= 0
      ) {
        // 次のタイマーに行くor終了するかを判断
        this.check()
      } else {
        this.dispTime[2]--
      }
    },

    // タイマーの状況にとって次のタイマーへ
    check: function () {
      // 集中時間 -> 休憩時間
      if (this.concentrationTime == true) {
        this.storeTime(0) // 計測した集中時間を記録
        this.dispTime = JSON.parse(JSON.stringify(this.settedTime[1])) // 表示を休憩時間へ
        this.concentrationTime = false // タイマー状況を休憩時間に
      }
      // 休憩時間 -> 集中時間(周回数が残っている場合)
      else if (
        this.concentrationTime == false &&
        this.lap < this.settedTime[2]
      ) {
        this.storeTime(1) // 計測した休憩時間を記録
        this.toPassTime() // 記録した計測時間を送る用の配列へ
        this.dispTime = JSON.parse(JSON.stringify(this.settedTime[0])) // 表示を集中時間へ
        this.concentrationTime = true // タイマー状況を集中時間に
        this.lap++ // ラップ数を+1(今何ラップ目かを数えてる)
      }
      // 休憩 -> 終了
      else {
        this.storeTime(1) // 計測した休憩時間を記録
        this.toPassTime() // 記録した計測時間を送る用の配列へ
        // サウンドモジュール呼び出し？
        this.completeTimer() // 完全終了 : タイマーを初期状態に
      }
    },

    // (通常時)計測時間を記録する(state:集中=0 or 休憩=1)
    storeTime: function (state) {
      this.resultTime[state][0] = this.settedTime[state][0]
      this.resultTime[state][1] = this.settedTime[state][1]
      this.resultTime[state][2] = this.settedTime[state][2]
    },

    // 計測結果を渡すようの配列に入れる
    toPassTime: function () {
      // this.passTime = []
      this.passTime[this.lap - 1] = JSON.parse(JSON.stringify(this.resultTime))
      console.log(this.passTime)
    },

    setTime: function () {
      if (this.sumDispTime > 0) {
        this.beforeSetting = false
      }
    },

    // スタータボタンが押されたらカウントダウンを開始
    startTimer: function () {
      if (this.start_first_time == true) {
        this.passTime = []
        this.lap = 1
        this.start_first_time = false
      }
      const self = this
      // 1秒(1000ミリ秒)ごとにカウントタイマー関数を呼び出す
      this.timerObj = setInterval(function () {
        self.countTimer()
      }, 1000)
      // タイマー画面の状況を変更(設定前ではない・計測前でない・カウント中・一時停止中でない)
      this.beforeSetting = false
      this.beforeCount = false
      this.timerOn = true
      this.timerPause = false
    },

    // ストップボタンが押されたらタイマーを停止
    stopTimer: function () {
      // タイマーを停止(カウントタイマー関数を呼ぶのを一旦やめる)
      clearInterval(this.timerObj)
      // タイマー画面の状況を変更(計測前でない・カウント中でない・一時停止中)
      this.beforeCount = false
      this.timerOn = false
      this.timerPause = true
    },

    // タイマーが完了したらリセットする
    completeTimer: function () {
      // タイマーを停止(カウントタイマー関数を呼ぶのを一旦やめる)
      clearInterval(this.timerObj)
      // 表示するタイマーを最初に設定してたやつに
      this.dispTime = this.dispTime = JSON.parse(
        JSON.stringify(this.settedTime[0])
      )
      // 初期の集中時間で上書き(計測前・カウント中でない・一時停止中でない)
      this.beforeCount = true
      this.timerOn = false
      this.timerPause = false
      this.concentrationTime = true
      // 記録モジュールをオーバーレイ
      this.togglePopup()
    },

    // スキップボタンが押されたらワークタイムを0に
    skipTimer: function () {
      // 計測時間を計算し、データを渡す用の配列へ
      this.calculationTime(0)
      // 休憩時間のタイマーに上書き
      this.dispTime = JSON.parse(JSON.stringify(this.settedTime[1]))
      // タイマー状況を休憩時間に
      this.concentrationTime = false
      // タイマーのカウントダウンを開始する
      this.startTimer()
    },

    // リセットボタンが押されたら初期状態にリセット
    resetTimer: function () {
      // 表示するタイマーを最初に設定してたやつに
      this.dispTime = JSON.parse(JSON.stringify(this.settedTime[0]))
      // 初期の集中時間で上書き(設定済み・計測前・カウント中でない・一時停止中でない)
      this.beforeSetting = false
      this.beforeCount = true
      this.timerOn = false
      this.timerPause = false
      this.concentrationTime = true
    },

    // セーブボタンが押されたら計測時間を計算して送る(passTimeに格納して、それを記録担当に送る)
    saveTime: function () {
      // 計測時間を計算
      this.tempStoreTime()
      this.resetTimer()
      // 記録モジュールをオーバーレイ
      this.togglePopup()
    },

    // 途中までの計測時間を計算してresultTimeに保存
    tempStoreTime: function () {
      // 集中時間を途中で止める場合
      if (this.concentrationTime == true) {
        this.calculationTime(0)
        // 休憩時間はnull
        this.resultTime[1] = null
      }
      // 休憩時間を途中で止める場合
      else if (this.concentrationTime == false) {
        this.calculationTime(1)
      }
      this.toPassTime()
    },

    // 途中計測時間を計算する
    calculationTime: function (state) {
      this.tempTime = [
        this.settedTime[state][0] - this.dispTime[0],
        this.settedTime[state][1] - this.dispTime[1],
        this.settedTime[state][2] - this.dispTime[2],
      ]
      if (this.tempTime[1] < 0) {
        this.tempTime[1] += 60
        this.tempTime[0] -= 1
      }
      if (this.tempTime[2] < 0) {
        this.tempTime[2] += 60
        this.tempTime[1] -= 1
      }
      this.resultTime[state] = JSON.parse(JSON.stringify(this.tempTime))
    },

    // ポップアップのトグル関数
    togglePopup: function () {
      this.start_first_time = true
      if (this.$store.getters.loginStatus) {
        this.isPoppingup = !this.isPoppingup
      }
    },
  },
}
</script>

<style scoped>
.head {
  text-align: center;
  color: var(--text-light-green);
}
.head span {
  font-weight: bold;
}
.body_frame {
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
}
.disp_box {
  display: inline;
  position: absolute;
  top: 30%;
}
.disp_time_box {
  font-size: 600%;
  position: relative;
  justify-content: center;
  align-content: center;
  text-align: center;
  z-index: 0;
}
.timer_color_green {
  /* 普段は濃緑 */
  color: var(--text-deeper-green);
}
.timer_color_orange {
  /* タイマー停止中だけオレンジ */
  color: var(--bg-orange);
}
.timer_color_chill {
  color: #9eb23b;
}
.button_box {
  margin-top: 10%;
  z-index: 0;
}
.center_box {
  position: relative;
  width: 100%;
}
.start_stop_box {
  position: absolute;
  top: 30%;
  width: 100%;
  margin-bottom: 40%;
}
.func-button {
  padding: 0.3rem 0;
  /* border-radius: 5%/20%; */
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: 0.2s;
}
.start_button {
  background-color: var(--text-default-green);
  color: var(--bgcolor);
  width: 24%;
  padding: 0.3rem 0;
  /* border-radius: 5%/20%; */
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
.start_button:hover {
  width: 30%;
}
.startt_button:hover + i {
  color: #000000;
}
.start_button i {
  text-align: center;
  justify-content: center;
  align-content: center;
  font-size: 300%;
  opacity: 1;
  transition: 0.2s;
}
.stop_button {
  background-color: var(--bg-orange);
  color: white;
  width: 24%;
  /* border-radius: 5%/20%; */
}
.stop_button:hover {
  width: 30%;
}
.stop_button i {
  text-align: center;
  justify-content: center;
  align-content: center;
  font-size: 300%;
}
.setting-icon {
  display: block;
}
.setting-icon i {
  color: var(--text-default-green);
}
.big_center_setting_icon {
  color: var(--text-default-green);
  font-size: 280%;
  position: relative;
  border-radius: 6px;
  transition: 0.2s;
}
.big_center_setting_icon:hover {
  /* box-shadow: 0px 8px 16px -2px rgba(10, 10, 10, 0.068),
    0px 0px 5px 4px rgba(0, 0, 0, 0.036); */
  background: var(--bg-gray);
  background: #dadfe087;
}
.small_right_setting_icon {
  font-size: 250%;
  position: absolute;
  right: 0;
  border-radius: 6px;
  transition: 0.2s;
}
.small_right_setting_icon:hover {
  /* box-shadow: 0px 8px 16px -2px rgba(10, 10, 10, 0.068),
    0px 0px 5px 4px rgba(0, 0, 0, 0.036); */
  background: var(--bg-gray);
  background: #dadfe087;
}
.bottom_box {
  position: absolute;
  margin-top: 30%;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
/* .skip_button {
  padding: 0.2rem 2.4rem;
  font-size: 1.8rem;
  color: var(--text-deep-green);
  background-color: var(--bgcolor);
  border: 2px solid var(--text-default-green);
  border-radius: 30px;
  margin-right: 2rem; <-コメントアウト
}
.skip_button:hover {
  background: var(--text-default-green);
  border: 2px solid transparent;
  color: var(--bgcolor);
  padding: 0.2rem 2rem;
  margin: 0 0.4rem;
} */
.skip_button {
  padding: 0.2rem 2.4rem;
  font-size: 1.8rem;
  color: var(--text-deep-green);
  background-color: var(--bgcolor);
  border: 2px solid var(--text-default-green);
  border-radius: 30px;
}
.skip_button:hover {
  background: var(--text-default-green);
  border: 2px solid transparent;
  color: var(--bgcolor);
  padding: 0.2rem 2rem;
  margin: 0 0.4rem;
  transition: 0.2s;
}
.reset_button {
  padding: 0.2rem 2.4rem;
  font-size: 1.8rem;
  color: var(--text-deep-green);
  background-color: var(--bgcolor);
  border: 2px solid var(--text-default-green);
  border-radius: 30px;
}
.reset_button:hover {
  background: var(--text-default-green);
  border: 2px solid transparent;
  color: var(--bgcolor);
  padding: 0.2rem 2rem;
  margin: 0 0.4rem;
}
.save_button {
  position: relative;
  /* left: 20%; */
  /* left: 14%; */
  padding: 0.2rem 2.4rem;
  font-size: 1.8rem;
  color: white;
  background-color: var(--text-default-green);
  border: 2px solid transparent;
  border-radius: 30px;
}
.save_button:hover {
  background: var(--text-deeper-green);
}
.disp_timer_set {
  z-index: 0;
  background-color: var(--text-default-green);
  border-radius: 10px;
  padding: 0.01rem 1rem;
  margin-top: 30rem;
}
.inner {
  background-color: white;
  margin: 5px;
  padding: 1rem;
  color: var(--text-default-green);
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-items: center;
}
.left_box {
  margin-right: 1rem;
  font-weight: 400 !important;
}
.space_chilltime {
  margin: 1rem 0;
}
.right_box {
  margin-left: 1rem;
}
.right_box >>> .disp_time {
  font-weight: 400;
}
.right_box >>> .displap_box {
  color: var(--text-default-green);
  font-weight: 400;
}
.popup-setting {
  /* 位置設定 */
  /* position: fixed;
  bottom: 0%;
  right: 0%;
  width: 50%;
  height: 70%; */
  position: absolute;
  bottom: 0;
  right: 4%;
  width: 70vw;
  max-width: 80rem;

  /* 親から継承するセンタリングを解消 */
  text-align: left;

  /* オーバーレイ */
  z-index: 10;
}
</style>
