import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/components/HelloWorld'),
    meta: {
      title: 'Page1'
    }
  },
  {
    path: '/home',
    component: () => import('@/components/HelloWorld'),
    meta: {
      title: 'Page2'
    }
  },
  {
    path: '/test',
    component: () => import('@/components/Test'),
    meta: {
      title: 'Page3'
    }
  }
]

const router = new VueRouter({
  routes
})

export default router