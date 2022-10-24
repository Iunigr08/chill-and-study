<template>
  <div>
    <p class="displap_box">
      {{ formatDateTime }}
    </p>
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

  computed: {
    formatDateTime: function () {
      return ("00" + this.prop_disp_lap).slice(-2)
    },
  },
}
</script>

<style scoped>
p {
  justify-content: center;
  align-items: left;
  color: var(--text-deeper-green);
  font-weight: bold;
  margin: auto;
  position: relative;
  left: 10%;
}
</style>
