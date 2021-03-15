import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import Home from './homeStore'

export default new Vuex.Store({
  modules: {
    home: Home
  }
})
