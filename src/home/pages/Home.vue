<template>
  <div>
    <custom-text
      :centerText="true"
      :text="'Custom Drop Down'"
      :customClass="'primary-text heading-font'"
    />
    <div class="center-div">
      <custom-drop-down :studentList="schoolDetails" />
    </div>
  </div>
</template>

<script>
import CustomDropDown from "@/core/components/CustomDropDown.vue";
import CustomText from "@/common/components/CustomText.vue";
import { schoolDetails } from "@/common/files/schoolDetails";
export default {
  components: { CustomDropDown, CustomText },
  data() {
    return {
      schoolDetails: schoolDetails,
    };
  },
};
</script>

<style scoped></style>
