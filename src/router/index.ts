import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/admin',
      component: () => import('../views/admin/Admin.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/notFound/NotFound.vue')
    }
  ]
})

export default router
