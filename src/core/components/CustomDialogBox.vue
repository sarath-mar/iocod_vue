<template>
  <div class="dialog-box">
    <div class="close">
      <span
        class="material-icons expand-more-icon"
        :class="showDropDownList && 'showDropDownList'"
        @click="close()"
      >
        close
      </span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    close() {
      console.log("hey");
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.dialog-box {
  height: 70vh;
  width: 60vw;
  background-color: #b3a7a7;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 8px;
  transform: translate(-50%, -50%);
  overflow: hidden;
  overflow-y: scroll;
}
.close {
  position: sticky;
  right: 0;
  float: right;
  top: 0px;
}
.expand-more-icon {
  top: 0px;
  background-color: white;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
}
</style>
