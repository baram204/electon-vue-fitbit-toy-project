import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production',
  state: {
    // 현재 상태
    name: '지훈',
    age: 20,
    dob: '20/08/1990',
    fitbit: {
      user: {},
      sleepLogList: 'ddd'
    }
  },
  getters: {
    // 현재 상태를 기반으로 지연 계산된 상태, vue 의 computed 속성과 비슷하다.
    fitbit: state => {
      return state.fitbit
    }
  },
  mutations: {
    // 현재 상태를 변형(mutate)한다.
    setFitbitUser (state, user) {
      state.fitbit.user = user
    },
    setFitbiSleepLogsList (state, sleepLosgsList) {
      state.fitbit.sleepLogList = sleepLosgsList
    }
  },
  actions: {
    // 서버로부터 자료를 가져와서, 현재 상태를 변형하기 위해 mutations 로 보낸다.
    // 프로파일 가져오기
    fetchProfile ({commit}, fitbit) {
      Vue.prototype.$axios({
        url: 'https://api.fitbit.com/1/user/' + fitbit.accountUserId + '/profile.json',
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + fitbit.token}
      }).then(function (response) {
        commit('setFitbitUser', response.data.user)
      }).catch(function (error) {
        console.log(error.response)
      })
    },
    // 수면로그 목록 가져오기
    fetchSleepLogList ({commit}, {fitbit, afterDate}) {
      Vue.prototype.$axios({
        url: `https://api.fitbit.com/1.2/user/${fitbit.accountUserId}/sleep/list.json?afterDate=${afterDate}&sort=desc&offset=0&limit=100`,
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + fitbit.token}
      }).then(function (response) {
        commit('setFitbiSleepLogsList', response.data.sleep)
      }).catch(function (error) {
        console.log(error.response)
      })
    }
  }
})

// You can assign a store to variable and export
// export const store = new Vuex.Store({})
// Import the store
// import { store } from '/path/to/file'
