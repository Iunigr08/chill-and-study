<template>
  <!-- 外枠 -->
  <div class="container">
    <div>aaa</div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      temp: null,
    }
  },

  props: {
    prop_select_time: {
      type: Array,
      required: true,
      default: () => [0, 0, 0],
    },
  },

  methods: function () {},
}
</script>

<style scoped></style>
