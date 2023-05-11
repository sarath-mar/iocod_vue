import { createStore } from 'vuex'

export default createStore({
  state: {
    show_dialog_box: false,
  },
  getters: {
    show_dialog_box: (state) => state.show_dialog_box,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
