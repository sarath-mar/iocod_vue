<template>
  <h1 :class="[centerText && 'text-center', customClass]">{{ text }}</h1>
</template>
<script>
export default {
  props: {
    text: {
      required: true,
      type: String,
    },
    customClass: {},
    centerText: {
      type: Boolean,
    },
  },
};
</script>
<style></style>
