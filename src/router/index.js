import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ClassifyItem from '../views/classifyItem.vue'
import ArticleDetails from '../views/articleDetails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: "陈实的博客_首页",
      keepAlive: true
    }
  }, {
    path: "/classifyItem/:id",
    name: "classifyItem",
    component: ClassifyItem
  }, {
    path: "/articleDetails/:id",
    name: "articleDetails",
    component: ArticleDetails,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  //路由跳转回到顶部
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to,from,next) => {
  window.document.title = to.meta.title == undefined ? "陈实的博客" : to.meta.title
  next()
})

// 路由重复跳转报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


export default router
