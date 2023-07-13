import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create-coach',
    name: 'CreateCoach',
    component: () => import(/* webpackChunkName: "createcoach" */ '../views/CreateCoach.vue')
  },
  {
    path: '/background-library',
    name: 'StockBackgrounds',
    component: () => import(/* webpackChunkName: "createcoach" */ '../views/BackgroundLibrary.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
