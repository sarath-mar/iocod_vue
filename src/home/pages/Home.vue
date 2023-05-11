<template>
  <div>
    <custom-text
      :centerText="true"
      :text="'Custom Drop Down'"
      :customClass="'primary-text heading-font'"
    />
    <div class="center-div">
      <custom-drop-down
        :studentList="schoolDetails"
        @submitEvent="submitEvent"
      />
    </div>
    <custom-dialog-box v-if="dialogOpen" @close="close">
      <ul class="ul-dialog">
        <span v-for="(item, index) in dropDownList" :key="index">
          <span v-for="(teacher, ind) in item.teachers" :key="ind">
            <span v-for="(student, inde) in teacher.studentsList" :key="inde">
              <li v-if="student.isChecked" class="mt-5">
                {{ student.name }} (class - {{ item.class }}) teacher - (
                {{ teacher.name }})
              </li>
            </span>
          </span>
        </span>
      </ul>
    </custom-dialog-box>
  </div>
</template>

<script>
import CustomDropDown from "@/core/components/CustomDropDown.vue";
import CustomText from "@/common/components/CustomText.vue";
import { schoolDetails } from "@/common/files/schoolDetails";
import CustomDialogBox from "@/core/components/CustomDialogBox.vue";
export default {
  components: { CustomDropDown, CustomText, CustomDialogBox },
  data() {
    return {
      schoolDetails: schoolDetails,
      dropDownList: [],
      dialogOpen: false,
    };
  },
  methods: {
    close() {
      this.dropDownList = [];
      this.dialogOpen = false;
    },
    submitEvent(data) {
      this.dropDownList = data;
      this.dialogOpen = true;
    },
  },
};
</script>

<style scoped>
.ul-dialog{
  /* display: flex; */
  /* overflow: hidden; */
}
</style>
