<template>
  <div class="content">
    <div class="disp_time">
      <span>
        {{ formatDateTime }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    prop_disp_time: {
      type: Array,
      required: true,
      default: () => [0, 0, 0],
    },
  },

  computed: {
    formatDateTime: function () {
      return (
        ("00" + this.prop_disp_time[0]).slice(-2) +
        ":" +
        ("00" + this.prop_disp_time[1]).slice(-2) +
        ":" +
        ("00" + this.prop_disp_time[2]).slice(-2)
      )
    },
  },
}
</script>

<style scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;

  display: inline;
}

.disp_time {
  /* color: var(--text-deeper-green); */
  font-weight: bold;
  /* margin: auto; */
}
</style>
