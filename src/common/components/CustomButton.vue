<template>
  <button :class="['custom-button', customClass]">{{ text }}</button>
</template>
<script>
export default {
  props: {
    text: String,
    required: true,
  },
};
</script>
<style>

</style>
