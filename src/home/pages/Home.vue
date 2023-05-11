<template>
  <div>
    <custom-text
      :centerText="true"
      :text="'Custom Drop Down'"
      :customClass="'primary-text heading-font'"
    />
    <div class="center-div">
      <custom-drop-down />
    </div>
  </div>
</template>

<script>
import CustomDropDown from "@/core/components/CustomDropDown.vue";
import CustomText from "@/common/components/CustomText.vue";
export default {
  components: { CustomDropDown, CustomText },
};
</script>

<style scoped></style>
