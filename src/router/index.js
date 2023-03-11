import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'

Vue.use(Router)

let routes = [
  {
    path: '/',
    name: 'index',
    component: index
  }
]

const router = new Router({
  routes
})

export default router
