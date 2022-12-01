import { createRouter, createWebHistory } from 'vue-router'
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'

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
      path: '/main',
      component: () => import('../views/main/Main.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/notFound/NotFound.vue')
    }
  ]
})

// 导航守卫
// 逻辑判断：进入主控台(admin), 判断是否已登录？ 跳转admin ： 跳转login
// 参数: to => 要跳转的路径 ； from => 从哪里跳转
// 返回值 跳转的路径
router.beforeEach((to, from) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }
})
export default router
