<template>
  <div>
    <!-- ローディング画面を表示 -->
    <div class="loading_page" v-if="!(workOK && presetOK)">
      <div class="disp_loading">
        <!-- ローディングアイコン -->
        <i class="ri-loader-4-line"></i>
        <span>Now Loading...</span>
      </div>
    </div>
    <div v-if="workOK && presetOK">
      <!-- 切り替えボタンを表示 -->
      <div class="page_switch_box">
        <button class="to_timeline_button" @click="dashbord_button">
          ダッシュボード
        </button>
        <button class="to_dashboard_button" @click="timeline_button">
          過去の記録
        </button>
      </div>
      <!-- ダッシュボードページを表示 -->
      <div class="save_page" v-if="dashbord_show == true">
        <div class="center_flame">
          <div class="graph_box">
            <div><DashboardDispGraph :prop_graph_data="graph_data" /></div>
          </div>
        </div>
        <div class="bottom_flame">
          <div class="left_box bottom_box">
            <DashboardEditPreset
              :props_preset="presetArry"
              @emit_data="preset_emit"
            />
          </div>
          <div class="right_box bottom_box">
            <DashboardSumTime :props_weeksumdata="week_sum_data" />
          </div>
        </div>
      </div>
      <!-- 記録(タイムライン)ページを表示 -->
      <div class="timeline_page" v-if="dashbord_show == false">
        <div>
          <DashboardDispTime
            :props_weekdata="alldata"
            @emit_more="work_load_emit"
            @emit_update="emitupdate"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardDispGraph from "./Board/DashboardDispGraph.vue"
import DashboardEditPreset from "./Board/DashboardEditPreset.vue"
import DashboardDispTime from "./Record/DashboardDispTime.vue"
import DashboardSumTime from "./Board/DashBoardSumTime.vue"

export default {
  components: {
    DashboardDispGraph,
    DashboardEditPreset,
    DashboardDispTime,
    DashboardSumTime,
  },
  data: function () {
    return {
      //ワークの読み込みが終了済み
      workOK: false,
      //プリセットの読み込みが終了済み
      presetOK: false,
      //ダッシュボードタイムライン切り替え
      dashbord_show: true,
      //成形後の全データ
      alldata: null,
      //プリセットのデータ
      presetArry: [],
      //データベースから持ってきた処理前データ
      input_data: null,
      //中間データ
      weekdata: [],
      //日ごとの合計のデータ1週間分
      week_sum_data: null,
      //グラフ用データ
      graph_data: null,
      //指定週間前のデータを呼び出し
      week_ago: null,
    }
  },
  created: function () {
    console.log("dashboard")

    //初期読み込み
    console.log(this.$store.getters.getPresetFlag)
    if (this.$store.getters.getPresetFlag) {
      console.log("preset created")
      this.loadpreset()
      this.presetOK = true
    }
    this.loadWork()
    if (this.alldata == null) {
      this.week_ago = 0
      console.log("databaseアクセス")
      this.$store
        .dispatch("syncGetwork", { weekago: this.week_ago })
        .then((data) => {
          this.input_data = data.val()
          if (this.input_data != null && this.input_data != "") {
            this.makeweekdata()
            this.makealldata(this.week_ago)
            this.commitWork()
            this.maketoday()
            this.graphdata()
          }
          console.log("graph compulete")
          this.workOK = true
        })
    } else {
      console.log("storeアクセス")
      var alldata_keys = Object.keys(this.alldata)
      this.week_ago = alldata_keys[alldata_keys.length - 1]
      if (this.alldata[0]) {
        this.maketoday()
        this.graphdata()
        console.log("graph compulete")
      }
      this.workOK = true
    }
  },
  methods: {
    decide_button1_bgcolor: function () {
      if (this.dashbord_show == true) {
        return "var(--text-default-green)"
      } else {
        return "var(--bgcolor)"
      }
    },
    decide_button1_color: function () {
      if (this.dashbord_show == true) {
        return "white"
      } else {
        return "var(--text-default-green)"
      }
    },
    decide_button2_bgcolor: function () {
      if (this.dashbord_show == true) {
        return "var(--bgcolor)"
      } else {
        return "var(--text-default-green)"
      }
    },
    decide_button2_color: function () {
      if (this.dashbord_show == true) {
        return "var(--text-default-green)"
      } else {
        return "white"
      }
    },
    //プリセット基本操作
    loadpreset: function () {
      console.log(this.$store.getters.getpreset)
      this.presetArry = this.$store.getters.getpreset
      console.log("loadpreset")
    },
    commitpreset: function () {
      this.$store.commit("setPreset", this.presetArry)
    },
    //記録データ基本操作
    uploadWork: function () {
      //
    },
    loadWork: function () {
      this.alldata = this.$store.getters.getWork
    },
    commitWork: function () {
      this.$store.commit("setWork", this.alldata)
    },
    //日付データ作成
    todaydate: function () {
      var now = new Date()
      var today_date = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      )
      //
      return today_date
    },
    //日付データ処理
    makeweekdata: function () {
      this.weekdata = []
      var input_data_length = Object.keys(this.input_data).length
      var date_key_str = Object.keys(this.input_data)
      var before_day = -1
      for (let i = 0; i < 7; i++) {
        this.weekdata[i] = null
      }
      for (let i = input_data_length - 1; i >= 0; i--) {
        var date = new Date(
          Number(date_key_str[i].substr(0, 4)),
          Number(date_key_str[i].substr(4, 2)) - 1,
          Number(date_key_str[i].substr(6, 2))
        )
        var day = date.getDay()
        if (day < 7) {
          if (before_day != day) {
            var data = {}
          }
          data[date_key_str[i]] = this.input_data[date_key_str[i]]
          this.weekdata[day] = JSON.parse(JSON.stringify(data))
          before_day = day
        } else {
          break
        }
      }
    },
    makealldata(weekago) {
      if (this.alldata == null) {
        this.alldata = []
      }
      this.alldata[weekago] = JSON.parse(JSON.stringify(this.weekdata))
    },
    maketoday: function () {
      //各日の合計時間計算
      var weekdata = JSON.parse(JSON.stringify(this.alldata[0]))
      var week_data_length = Object.keys(weekdata).length
      this.week_sum_data = []
      for (let i = 0; i < 7; i++) {
        this.week_sum_data[i] = [0, 0, 0]
      }
      var time
      for (let i = 0; i < week_data_length; i++) {
        if (weekdata[i] === null) {
          time = [0, 0, 0]
        } else {
          time = [0, 0, 0]
          var date_data_length = Object.keys(weekdata[i]).length
          var date_data_key = Object.keys(weekdata[i])
          for (let j = 0; j < date_data_length; j++) {
            var date_data = weekdata[i][date_data_key[j]]["Work"]
            var date_lap = Object.keys(date_data).length
            for (let k = 2; k >= 0; k--) {
              for (let lap_count = 0; lap_count < date_lap; lap_count++) {
                time[k] += date_data[lap_count][0][k]
                if (k != 0) {
                  if (time[k] > 59) {
                    time[k - 1]++
                    time[k] -= 60
                  }
                }
              }
            }
          }
        }
        this.week_sum_data[i] = time
      }
    },
    //グラフ用処理
    graphdata: function () {
      this.graph_data = []
      var today_date = this.todaydate()
      var date = today_date
      date.setDate(date.getDate() - date.getDay())
      for (let i = 0; i < 7; i++) {
        var date_str =
          date.getFullYear() +
          ("00" + (date.getMonth() + 1)).slice(-2) +
          ("00" + date.getDate()).slice(-2)
        this.graph_data[i] = [date_str, this.week_sum_data[i]]
        date.setDate(date.getDate() + 1)
      }
    },
    //emit用処理
    //プリセットemit
    preset_emit(value) {
      this.presetArry = value
      this.commitpreset()
      this.$store.dispatch("syncuploadpreset")
    },
    //追加でデータ読み込み
    work_load_emit() {
      this.week_ago++
      this.input_data = null
      console.log("データベースアクセス")
      this.$store
        .dispatch("syncGetwork", { weekago: this.week_ago })
        .then((data) => {
          this.input_data = data.val()
          if (this.input_data != null) {
            this.makeweekdata()
            this.makealldata(this.week_ago)
            this.commitWork()
          }
        })
    },
    //下位モジュールのデータ更新を反映するため、ストアからのデータを取り込み更新
    emitupdate() {
      console.log("update")
      this.loadWork()
      var alldata_keys = Object.keys(this.alldata)
      this.week_ago = alldata_keys[alldata_keys.length - 1]
      if (this.alldata[0]) {
        this.maketoday()
        this.graphdata()
      }
    },
    //表示切替
    dashbord_button: function () {
      this.dashbord_show = true
    },
    timeline_button: function () {
      this.dashbord_show = false
    },
  },
  computed: {
    presetflag: function () {
      console.log("ok")
      return this.$store.getters.getPresetFlag
    },
  },
  watch: {
    presetflag(value) {
      if (value) {
        console.log("preset watch")
        this.loadpreset()
        this.presetOK = true
      }
    },
  },
}
</script>

<style scoped>
.loading_page {
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
}
.disp_loading {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 40%;
}
@keyframes rotate_anime {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.loading_page i {
  color: var(--text-deeper-green);
  font-size: 600%;
  animation: rotate_anime 1s infinite;
}
.loading_page span {
  font-size: 200%;
}
.page_switch_box {
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 2%;
  margin-bottom: 2%;
  gap: 8%;
}
.to_timeline_button {
  background-color: v-bind("decide_button1_bgcolor()");
  color: v-bind("decide_button1_color()");
  border-radius: 15px;
  border: 2px solid var(--text-default-green);
  /* width: 12%; */
  width: 16rem;
  /* height: 5%; */
  padding: 0.3rem 0;
}
.to_dashboard_button {
  background-color: v-bind("decide_button2_bgcolor()");
  color: v-bind("decide_button2_color()");
  border-radius: 15px;
  border: 2px solid var(--text-default-green);
  /* width: 15%; */
  width: 16rem;
  /* height: 5%; */
  padding: 0.3rem 0;
}
.page_switch_box button {
  transition: 0.2s;
  margin: 0 0.5rem;
}
.page_switch_box button:hover {
  width: 17rem;
  margin: 0;
  border-radius: 4px;
}
.save_page {
  width: 100%;
}
.center_flame {
  width: 100%;
  height: 40%;
}
.graph_box {
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: white;
  box-shadow: 0px 10px 5px 0px rgba(10, 10, 10, 0.1),
    0px 0px 0px 1px rgba(10, 10, 10, 0.02);
}
.bottom_flame {
  display: grid;
  grid-template-areas: "left right";
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  gap: 5%;
  margin: 5%;
}
.left_box {
  grid-area: left;
  box-shadow: 0px 5px 4px 5px rgba(10, 10, 10, 0.08),
    0px 0px 0px 1px rgba(10, 10, 10, 0.02);
}
.left_box .content {
  padding-bottom: 5%;
}
.right_box {
  grid-area: right;
  box-shadow: 0px 5px 4px 5px rgba(10, 10, 10, 0.08),
    0px 0px 0px 1px rgba(10, 10, 10, 0.02);
}
.right_box .flame {
  padding: 5%;
}
.timeline_page {
  display: flex;
  flex-direction: column;
  margin-left: 15%;
  margin-right: 15%;
}
</style>
