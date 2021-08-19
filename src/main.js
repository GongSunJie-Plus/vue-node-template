import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'

// import './styles/index.scss'
import Inifite from '@/common/infinite'

Vue.use(Inifite)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
