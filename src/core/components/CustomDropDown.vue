<template>
  <div class="container">
    {{ updatedDataList }}
    <div class="select-box">
      <div class="selected" @click="showDropDownList = !showDropDownList">
        <div class="drop-down-title">
          <h5>Select Items</h5>
          <div>
            <span
              v-if="dataList.length"
              class="material-icons expand-more-icon"
              :class="showDropDownList && 'showDropDownList'"
            >
              expand_more
            </span>
          </div>
        </div>
      </div>
      <div v-show="showDropDownList">
        <div class="active">
          <div class="input-div">
            <input
              type="text"
              name=""
              id=""
              placeholder="Search.."
              v-model="searchVal"
            />
            <span class="material-icons expand-more-icon"> search</span>
          </div>

          <div v-for="(school, indexMain) in dataList" :key="indexMain">
            <div class="option-main">
              <span
                class="material-icons expand-more-icon"
                :class="showMainCategory(indexMain) && 'showDropDownList'"
                @click.stop="clickMainHeader(indexMain)"
              >
                expand_more
              </span>
              <input
                type="checkbox"
                class="radio"
                :checked="isMainCategoryChecked(indexMain)"
                @click="onCheckMainCategory($event, indexMain)"
              />
              <label
                ><p class="option-main-text">{{ school.class }}</p></label
              >
            </div>
            <div class="ml-5" v-show="showMainCategory(indexMain)">
              <p class="option-main-sub-text option-main-text">
                {{ school.class }}
              </p>
              <hr class="line-style" />
              <div v-for="(teacher, index) in school.teachers" :key="index">
                <div class="option-primary">
                  <span
                    @click="clickSubHeader(indexMain, index)"
                    class="material-icons expand-more-icon"
                    :class="
                      showSubCategory(indexMain, index) && 'showDropDownList'
                    "
                  >
                    expand_more
                  </span>
                  <input
                    type="checkbox"
                    class="radio"
                    :checked="isSubCategoryChecked(indexMain, index)"
                    @click="onCheckSubCategory($event, indexMain, index)"
                  />
                  <label>{{ teacher.name }}</label>
                </div>
                <div
                  v-for="(student, i) in teacher.stundestsList"
                  :key="i"
                  class="ml-10"
                  v-show="showSubCategory(indexMain, index)"
                >
                  <div class="option-secondary">
                    <input
                      type="checkbox"
                      class="radio"
                      :checked="student.isChecked"
                      @click="student.isChecked = !student.isChecked"
                    />
                    <label>{{ student.name }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-button px-5">
          <div>
            <custom-button :text="'Select All'" @click="isSelectAll(true)" />
            <custom-button
              class="ml-5"
              :text="'Clear'"
              @click="isSelectAll(false)"
            />
          </div>
          <div class="submit-btn-div">
            <custom-button :text="'Submit'" :class="'submit-button '" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomButton from "@/common/components/CustomButton.vue";
export default {
  components: { CustomButton },
  data() {
    return {
      searchVal: "",
      toggleDropDown: false,
      selectedMainList: [],
      selectedSubList: [],
      // selectedList: [],
      showDropDownList: false,
      updatedDataList: [],
      dataList: [
        {
          class: "Science",
          teachers: [
            {
              name: "Teacher One",
              stundestsList: [
                { name: "Student one 1", isChecked: true },
                { name: "Student one 2", isChecked: false },
              ],
            },
            {
              name: "Teacher Two",
              stundestsList: [
                { name: "Student one 1" },
                { name: "Student one 2" },
              ],
            },
            {
              name: "Teacher Three",
              stundestsList: [
                { name: "Student one 1" },
                { name: "Student one 2" },
              ],
            },
          ],
        },
        {
          class: "Commerce",
          teachers: [
            {
              name: "Teacher One",
              stundestsList: [
                { name: "Student one 1" },
                { name: "Student one 2" },
              ],
            },
            {
              name: "Scolack",
              stundestsList: [
                { name: "Student two 1" },
                { name: "Student one 2" },
              ],
            },
            {
              name: "Teacher Three",
              stundestsList: [
                { name: "Student one 1" },
                { name: "Student one 2" },
              ],
            },
          ],
        },
        {
          class: "Humainty",
          teachers: [
            {
              name: "Teacher One",
              stundestsList: [
                { name: "Student one 1" },
                { name: "Student one 2" },
              ],
            },
            {
              name: "Teacher Two",
              stundestsList: [
                { name: "Student one 1" },
                { name: "Student one 2" },
              ],
            },
            {
              name: "Teacher Three",
              stundestsList: [
                { name: "Student one 1" },
                { name: "Student one 2" },
              ],
            },
          ],
        },
      ],
    };
  },
  watch: {
    searchVal: {
      handler() {
        this.searchData();
      },
      immediate: true,
    },
  },
  methods: {
    isWordMatches(word, input) {
      if (word && input) {
        var pattern = new RegExp("(\\w*" + input + "\\w*)", "gi");
        var matches = word.match(pattern);
        return matches;
      } else {
        return false;
      }
    },
    searchData() {
      let newArray = [];
      console.log("hye");
      if (this.searchVal !== "") {
        let value = this.searchVal;
        for (const list of this.dataList) {
          if (!list.class) {
            continue;
          }
          if (this.isWordMatches(list.class, value)) {
            newArray.push(list);
          } else {
            let newPrimaryObject = new Object();
            newPrimaryObject.class = list.class;
            newPrimaryObject.teachers = [];
            for (const teacher of list.teachers) {
              if (!teacher.name) {
                continue;
              }
              if (this.isWordMatches(teacher.name, value)) {
                newPrimaryObject.teachers.push(teacher);
                newArray.push(newPrimaryObject);
              } else {
                // newPrimaryObject.teachers
                // let secondaryObject = { name: teacher.name, stundestsList: [] };
                // for (const student of teacher.stundestsList) {
                //   if (!student.name) {
                //     continue;
                //   }
                //   if (this.isWordMatches(student.name, value)) {
                //     secondaryObject.stundestsList.push(student);
                //     newPrimaryObject.teachers.push(secondaryObject);
                //     newArray.push(newPrimaryObject);
                //   }
                // }
                // newPrimaryObject.teachers
              }
            }
          }
        }
        this.updatedDataList = [...newArray];
      } else {
        this.updatedDataList = [...this.dataList];
      }
    },
    clickMainHeader(index) {
      let existingIndex = this.selectedMainList.indexOf(index);
      if (existingIndex !== -1) {
        this.selectedMainList.splice(existingIndex, 1);
        return;
      }
      this.selectedMainList.push(index);
    },
    clickSubHeader(indexMain, index) {
      let mainDataIndex = this.selectedSubList
        .map((x) => x.indexMain)
        .indexOf(indexMain);
      if (mainDataIndex !== -1) {
        let indexOfSubOnClick =
          this.selectedSubList[mainDataIndex].subIndexes.indexOf(index);

        if (indexOfSubOnClick != -1) {
          this.selectedSubList[mainDataIndex].subIndexes.splice(
            indexOfSubOnClick,
            1
          );
          return;
        } else {
          this.selectedSubList[mainDataIndex].subIndexes.push(index);
          return;
        }
      }
      let newObject = { indexMain, subIndexes: [index] };
      this.selectedSubList.push(newObject);
    },
    showMainCategory(index) {
      let data = this.selectedMainList.includes(index);
      return data;
    },
    showSubCategory(indexMain, index) {
      let mainDataIndex = this.selectedSubList
        .map((x) => x.indexMain)
        .indexOf(indexMain);
      if (mainDataIndex !== -1) {
        let indexOfSub =
          this.selectedSubList[mainDataIndex].subIndexes.includes(index);
        return indexOfSub;
      }
      return false;
    },
    onCheckSubCategory(event, indexMain, index) {
      let checked = event.target.checked;
      this.dataList[indexMain] &&
        this.dataList[indexMain].teachers &&
        this.dataList[indexMain].teachers[index] &&
        this.dataList[indexMain].teachers[index].stundestsList &&
        this.dataList[indexMain].teachers[index].stundestsList.length &&
        this.dataList[indexMain].teachers[index].stundestsList.forEach(
          (student) => {
            student.isChecked = checked;
          }
        );
    },
    isSelectAll(check) {
      this.dataList.forEach((data) => {
        data.teachers &&
          data.teachers.forEach(
            (teacher) =>
              teacher.stundestsList &&
              teacher.stundestsList.forEach((x) => {
                x.isChecked = check;
              })
          );
      });
    },
    onCheckMainCategory(event, indexMain) {
      let checked = event.target.checked;
      this.dataList[indexMain].teachers &&
        this.dataList[indexMain].teachers.length &&
        this.dataList[indexMain].teachers.forEach((teacher) => {
          teacher.stundestsList.forEach((student) => {
            student.isChecked = checked;
          });
        });
    },
    isSubCategoryChecked(indexMain, index) {
      return (
        this.dataList[indexMain].teachers &&
        this.dataList[indexMain].teachers[index] &&
        this.dataList[indexMain].teachers[index].stundestsList &&
        this.dataList[indexMain].teachers[index].stundestsList.length &&
        this.dataList[indexMain].teachers[index].stundestsList.every(
          (x) => x.isChecked == true
        )
      );
      // return true
    },
    isMainCategoryChecked(indexMain) {
      return (
        this.dataList[indexMain].teachers &&
        this.dataList[indexMain].teachers.every((teacher, index) =>
          this.isSubCategoryChecked(indexMain, index)
        )
      );
    },
  },
  computed: {},
};
</script>

<style scoped>
.input-div {
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  /* background: #f1f1f1; */
}
.input-div span {
  position: absolute;
  right: 3px;
}
.input-div input {
  width: 100%;
  padding: 10px;
  font-size: 17px;
  border: 1px 0px solid grey !important;
  float: left;
  background: #f1f1f1;
}
.submit-button {
  background-color: violet;
  color: white;
}
.footer-button {
  display: flex;
  justify-content: space-between;
  background-color: #464747;
  padding: 20px;
}
.drop-down-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.select-box {
  display: flex;
  width: 400px;
  flex-direction: column;
}
.option-main-sub-text {
  /* margin-top: 3px; */
}
.line-style {
  /* margin-top: -13px; */
  margin-bottom: 0px;
  opacity: 0.4;
}
.option-main-text {
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  padding: 0;
}
/* .select-box .options-container {
  background: #2f3640;
  color: #f5f6fa;
  max-height: 0;
  width: 100%;
  opacity: 0;
  transition: all 0.4s;
  border-radius: 8px;
  overflow: hidden;

  order: 1;
} */

.selected {
  border-radius: 8px;
  margin-bottom: 4px;
  border: 1px violet solid;
  color: black;
  position: relative;

  order: 0;
}

.select-box .active {
  max-height: 340px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 4px;
  opacity: 1;
  overflow-y: scroll;
}

.showDropDownList {
  transform: rotateX(180deg);
  top: -6px;
}

.active::-webkit-scrollbar {
  width: 8px;
  background: #0d141f;
  /* border-radius: 0 8px 8px 0; */
}

.active::-webkit-scrollbar-thumb {
  background: #525861;
  /* border-radius: 0 8px 8px 0; */
}

.select-box .option-primary,
.option-main,
.option-secondary {
  padding: 12px 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
}

.selected {
  padding: 1px 24px;
  cursor: pointer;
}

.select-box .option-primary:hover {
  background: #5c5d5e;
  color: white;
}
.option-secondary:hover {
  background: #464747;
  color: white;
}
.select-box .option-main:hover {
  background: #918e8e;
  color: white;
}

.select-box label {
  cursor: pointer;
}

@media only screen and (max-width: 480px) {
  .select-box {
    width: 90vw;
  }
}
@media only screen and (max-width: 300px) {
  .footer-button {
    flex-direction: column;
  }
  .submit-btn-div {
    margin-top: 15px;
    text-align: center;
  }
}
</style>
