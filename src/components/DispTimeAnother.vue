<template>
  <div class="content">
    <div class="disp_time">
      <span class="hour_time">
        {{ prop_disp_time_another[0] }}
      </span>
      <span class="hour_unit unit">h</span>
      <span class="min_time">
        {{ prop_disp_time_another[1] }}
      </span>
      <span class="min_unit unit">m</span>
      <span class="sec_time">
        {{ prop_disp_time_another[2] }}
      </span>
      <span class="sec_unit unit">s</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    prop_disp_time_another: {
      type: Array,
      required: true,
      default: () => [0, 0, 0],
    },
  },
}
</script>

<style scoped>
.content {
  justify-content: center;
  align-content: center;
  text-align: left;
}
.disp_time {
  display: inline;
  font-weight: bold;
}
.unit {
  font-size: 80%;
  margin-right: 1rem;
  margin-left: 0.2rem;
}
</style>
