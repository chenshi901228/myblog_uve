import Vue from 'vue'
import App from './App.vue'
import ElementUi from 'element-ui'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import 'element-ui/lib/theme-chalk/index.css'
import 'swiper/css/swiper.min.css'

import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(ElementUi)
Vue.use(VueAwesomeSwiper)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
