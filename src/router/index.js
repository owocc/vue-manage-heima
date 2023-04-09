import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:"/login"
  },
  {
    path:'/login',
    component:()=>import('../views/user/login')
  }
]

const router = new VueRouter({
  base: '/VUE',
  routes
})
router.beforeEach((to,from,next)=>{
  next()
})
export default router
