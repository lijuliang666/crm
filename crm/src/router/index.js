import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//import Home from '../views/Home.vue'
import routes from './router'


const router = new VueRouter({
  routes
})

export default router
