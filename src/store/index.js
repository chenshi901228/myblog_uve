import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import Home from './homeStore'
import ClassItem from './classItemStore'
import Article from './articleStore'

export default new Vuex.Store({
  modules: {
    home: Home,
    classItem: ClassItem,
    article:Article
  }
})