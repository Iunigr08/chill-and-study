<template>
  <div class="content">
    <div class="disp_lap">
      <span class="lap_num"> {{ prop_disp_lap }}回 </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    prop_disp_lap: {
      type: Number,
      required: true,
      default: 1,
    },
  },
}
</script>

<style scoped>
.content {
  justify-content: center;
  align-content: center;
  text-align: center;
}
.disp_lap {
  display: inline;
  font-weight: bold;
}
.lap_num {
  font-size: 100%;
}
</style>
