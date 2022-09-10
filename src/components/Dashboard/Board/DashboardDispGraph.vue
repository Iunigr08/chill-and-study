<template>
  <div>
    <div v-if="v_reload">
      <Chart
        :size="{ width: 750, height: 320 }"
        :data="data"
        :margin="margin"
        :direction="direction"
        :axis="axis"
      >
        <template #layers>
          <Grid strokeDasharray="2,2" />
          <Bar
            :dataKeys="['date', 'time']"
            :barStyle="{ fill: '#0096c7' }"
            :maxWidth="20"
          />
          <Marker
            :value="1000"
            label="Avg."
            color="#e76f51"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
        </template>

        <template #widgets>
          <Tooltip
            borderColor="#48CAE4"
            :config="{
              time: { color: '#0096c7' },
            }"
          />
        </template>
      </Chart>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue"
import { Chart, Grid, Bar } from "vue3-charts"

export default defineComponent({
  name: "LineChart",
  components: { Chart, Grid, Bar },
  setup() {
    const data = [
      { date: "Sun", time: 0 },
      { date: "Mon", time: 0 },
      { date: "Tue", time: 0 },
      { date: "Wed", time: 0 },
      { date: "Thu", time: 0 },
      { date: "Fri", time: 0 },
      { date: "Sat", time: 0 },
    ]
    var now
    now = new Date()
    now.setDate(now.getDate() - now.getDay())
    for (let i = 0; i < 7; i++) {
      data[i].date =
        ("00" + (now.getMonth() + 1)).slice(-2) +
        "/" +
        ("00" + now.getDate()).slice(-2)
      now.setDate(now.getDate() + 1)
    }
    const direction = ref("horizontal")
    const margin = ref({
      left: 0,
      top: 20,
      right: 20,
      bottom: 0,
    })
    const axis = ref({
      primary: {
        type: "band",
      },
      secondary: {
        domain: ["dataMin", "dataMax + 100"],
        type: "linear",
        ticks: 8,
      },
    })
    return { data, direction, margin, axis }
  },

  data: function () {
    return {
      v_reload: true,
      graph_data: null,
    }
  },
  props: {
    prop_graph_data: {
      type: Array,
    },
  },
  methods: {
    graph() {
      for (let i = 0; i < this.graph_data.length; i++) {
        this.data[i].date =
          this.graph_data[i][0].slice(4, 6) +
          "/" +
          this.graph_data[i][0].slice(6, 8)
        if (this.graph_data != null) {
          let temp = this.graph_data[i][1]
          this.data[i].time = 60 * temp[0] + temp[1]
        }
      }
    },
  },
  watch: {
    prop_graph_data: {
      handler: function () {
        this.v_reload = false
        this.graph_data = JSON.parse(JSON.stringify(this.prop_graph_data))
        if (this.graph_data) {
          console.log("データ計算")
          this.graph()
        }
        this.v_reload = true
      },
      deep: true,
      immediate: true,
    },
  },
})
</script>
