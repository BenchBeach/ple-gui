import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

import Message from '@/components/message/index.js'
Vue.prototype.$message = Message

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
