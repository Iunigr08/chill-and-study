<template>
  <!-- today -->
  <div class="flame">
    <div class="head_title">
      <h3>ワークタイムの合計</h3>
    </div>
    <div class="disp_today">
      <p>今日 {{ today_date }}</p>
      <DispTimeAnother :prop_disp_time_another="today" />
    </div>
    <div class="disp_week">
      <p>今週 {{ week_date }}</p>
      <DispTimeAnother :prop_disp_time_another="week" />
    </div>
  </div>
</template>

<script>
import DispTimeAnother from "../components/DispTimeAnother.vue"
export default {
  components: {
    DispTimeAnother,
  },
  data: function () {
    return {
      today_date: null,
      today: [0, 0, 0],
      week_date: null,
      week: [0, 0, 0],
      week_sum_data: {},
    }
  },
  props: {
    props_weeksumdata: { type: Array },
  },
  created: function () {
    this.week_sum_data = this.props_weeksumdata
    this.getdatedata()
    this.maketoday()
  },
  methods: {
    //日付データを作成
    getdatedata: function () {
      let now = new Date()
      this.today_date =
        ("00" + (now.getMonth() + 1)).slice(-2) +
        "/" +
        ("00" + now.getDate()).slice(-2)
      let sundaydate = new Date(now.getTime())
      sundaydate.setDate(sundaydate.getDate() - sundaydate.getDay())
      let satadaydate = new Date(now.getTime())
      satadaydate.setDate(satadaydate.getDate() - satadaydate.getDay() + 6)
      this.week_date =
        ("00" + (sundaydate.getMonth() + 1)).slice(-2) +
        "/" +
        ("00" + sundaydate.getDate()).slice(-2) +
        "~" +
        ("00" + (satadaydate.getMonth() + 1)).slice(-2) +
        "/" +
        ("00" + satadaydate.getDate()).slice(-2)
    },
    //一週間分の合計を計算
    maketoday: function () {
      if (this.week_sum_data != null) {
        //今日の合計時間
        this.today = this.week_sum_data[new Date().getDay()]
        //１週間の合計時間
        var sum = [0, 0, 0]
        var week_sum_length = Object.keys(this.week_sum_data).length
        for (let i = 2; i >= 0; i--) {
          for (let lap_count = 0; lap_count < week_sum_length; lap_count++) {
            sum[i] += this.week_sum_data[lap_count][i]
            if (i != 0) {
              if (sum[i] > 59) {
                sum[i - 1]++
                sum[i] -= 60
              }
            }
          }
        }
        this.week = sum
      }
    },
  },
  computed: {
    formated_time: () => (timedata) => {
      var lap = timedata.length
      var sum = [0, 0, 0]
      for (let i = 2; i >= 0; i--) {
        for (let lap_count = 0; lap_count < lap; lap_count++) {
          sum[i] += timedata[lap_count][0][i]
          if (i != 0) {
            if (sum[i] > 59) {
              sum[i - 1]++
              sum[i] -= 60
            }
          }
        }
      }
      return (
        ("00" + sum[0]).slice(-2) +
        ":" +
        ("00" + sum[1]).slice(-2) +
        ":" +
        ("00" + sum[2]).slice(-2)
      )
    },
    formated_date: () => (datedata) => {
      return (
        datedata.substr(0, 4) +
        "/" +
        datedata.substr(4, 2) +
        "/" +
        datedata.substr(6, 2) +
        " " +
        datedata.substr(8, 2) +
        ":" +
        datedata.substr(10, 2) +
        ":" +
        datedata.substr(12, 2)
      )
    },
  },
  watch: {
    props_weeksumdata: function () {
      this.week_sum_data = this.props_weeksumdata
      this.maketoday()
    },
  },
}
</script>

<style scoped>
.flame {
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
}
.head_title {
  color: var(--text-deeper-green);
  margin-bottom: 3%;
}
.disp_today {
  color: var(--text-deeper-green);
  margin-bottom: 3%;
}
.disp_today p {
  font-size: 80%;
}
.disp_today .content {
  font-size: 150%;
  position: relative;
  left: 5%;
}
.disp_today >>> .unit {
  color: var(--text-light-green);
}
.disp_week {
  color: var(--text-deeper-green);
}
.disp_week p {
  font-size: 80%;
}
.disp_week .content {
  font-size: 150%;
  position: relative;
  left: 5%;
}
.disp_week >>> .unit {
  color: var(--text-light-green);
}
</style>
