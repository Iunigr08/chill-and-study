<template>
  <!-- today -->
  <div>
    <div class="disp_cards">
      <div v-for="(adata, i) in getdata" v-bind:key="i">
        <div v-for="(wata, j) in getdata[i]" v-bind:key="j">
          <div v-for="(data, k) in getdata[i][j]" v-bind:key="k">
            <div class="oneday_box">
              <DashboardTimelineCard
                :props_card_date="k"
                :props_card_data="getdata[i][j][k]"
                @emit_request="emit_request_edit"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="disp_add_data_button">
      <button @click="add">さらに読み込む</button>
    </div>
    <div class="popup_detail" v-if="ispopingup">
      <DashboardEditTime
        :togglePopup="togglePopup"
        :props_edit_date="request_edit_date"
        :props_edit_data="getdata[edit_week][edit_day][request_edit_date]"
        @emit_update_data="emit_update_data"
      />
    </div>
  </div>
</template>

<script>
import DashboardTimelineCard from "../components/DashboardTimelineCard.vue"
import DashboardEditTime from "../components/DashboardEditTime.vue"

export default {
  components: {
    DashboardTimelineCard,
    DashboardEditTime,
  },
  data: function () {
    return {
      //入力データ
      getdata: {},
      request_edit_date: null,
      //編集モードの表示切替
      ispopingup: false,
      edit_week: null,
      edit_day: null,
    }
  },

  props: {
    props_weekdata: { type: Array },
  },

  //初期読み込み
  created: function () {
    this.getdata = JSON.parse(JSON.stringify(this.props_weekdata))
    console.log(this.getdata)
    if (this.getdata != null) {
      this.sortdata()
    }
  },

  methods: {
    //データをソート
    sortdata: function () {
      for (let i = 0; i < this.getdata.length; i++) {
        if (this.getdata[i]) {
          this.getdata[i].reverse()
        }
      }
    },
    //データを追加読み込みを要求
    add: function () {
      this.$emit("emit_more", this.passPreset)
    },
    //タイムラインモジュールからの要求
    emit_request_edit(value) {
      if (!this.ispopingup) {
        this.request_edit_date = value
        this.edit_request()
        this.togglePopup()
      }
    },
    //編集先の呼び出しデータの作成
    edit_request() {
      var date = new Date(
        Number(this.request_edit_date.substr(0, 4)),
        Number(this.request_edit_date.substr(4, 2)) - 1,
        Number(this.request_edit_date.substr(6, 2))
      )
      this.edit_day = 6 - date.getDay()
      //何週間前かを計算
      let now = new Date()
      let sunday_date = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - now.getDay()
      )
      let request_week_sunday = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - date.getDay()
      )
      for (let i = 0; i < this.getdata.length; i++) {
        if (sunday_date.getTime() === request_week_sunday.getTime()) {
          this.edit_week = i
          break
        }
        sunday_date.setDate(sunday_date.getDate() - 7)
      }
    },
    //表示切替
    togglePopup: function () {
      this.ispopingup = !this.ispopingup
    },
    emit_update_data: function () {
      this.$emit("emit_update")
    },
  },
  watch: {
    props_weekdata: {
      handler: function () {
        console.log("new data")
        this.getdata = JSON.parse(JSON.stringify(this.props_weekdata))
        this.sortdata()
      },
      deep: true,
    },
  },
}
</script>

<style scoped>
.disp_cards {
  z-index: 0;
  width: 80%;
  margin: 0 10%;
  /* display: flex;
  justify-content: center;
  align-content: center;
  text-align: center; */
}
.disp_add_data_button {
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  margin-top: 8%;
  margin-bottom: 8%;
}
.disp_add_data_button button {
  color: var(--text-default-green);
  background-color: var(--bgcolor);
  border: 2px solid var(--text-default-green);
  border-radius: 4px;
  border-radius: 20px;
  /* width: 15%; */
  padding: 0.26rem 2rem;
  transition: 0.2s;
}
.disp_add_data_button button:hover {
  background-color: var(--text-default-green);
  color: white;
  border: 2px solid var(--text-default-green);
}
.popup_detail {
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
