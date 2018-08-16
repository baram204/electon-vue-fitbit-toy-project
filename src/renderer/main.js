import Vue from 'vue'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import VueMarkdown from 'vue-markdown'

import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.component('vue-markdown', VueMarkdown)

Vue.prototype.$fitbit = {
  token: window.localStorage.getItem('fitbitOauthToken'),
  expiresIn: window.localStorage.getItem('fitbitOauthExpiresIn'),
  accountUserId: window.localStorage.getItem('fitbitOauthAccountUserId'),
  isLoggedIn: window.localStorage.getItem('fitbitOauthToken') !== undefined
}

Vue.prototype.$axios = axios

if (Vue.prototype.$fitbit.token !== undefined) {
  Vue.prototype.$axios.defaults.headers.common = {
    'Authorization': 'Bearer ' + Vue.prototype.$fitbit.token
  }
}

/* eslint-disable no-new */
new Vue({
  components: {App},
  router,
  store,
  template: '<App/>'
}).$mount('#app')
