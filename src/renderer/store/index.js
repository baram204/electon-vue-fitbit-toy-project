import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production',
  state: {
    // 현재 상태
    name: '바지',
    age: 20,
    dob: '20/08/1990'
  },
  getters: {
    // 현재 상태를 기반으로 지연 계산된 상태, vue 의 computed 속성과 비슷하다.
  },
  mutations: {
    // 현재 상태를 변형(mutate)한다.
  },
  actions: {
    // 서버로부터 자료를 가져와서, 현재 상태를 변형하기 위해 mutations 로 보낸다.
  }
})

// You can assign a store to variable and export
// export const store = new Vuex.Store({})
// Import the store
// import { store } from '/path/to/file'
