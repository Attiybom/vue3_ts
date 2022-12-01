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
      name: 'main',
      component: () => import('../views/main/Main.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/notFound/NotFound.vue')
    }
  ]
})

// 动态路由
// 根据菜单权限决定是否注册路由

// /main/system/user
// AsideMenu.vue:55 /main/system/department
// AsideMenu.vue:55 /main/system/menu
// AsideMenu.vue:55 /main/system/role

const CHildxxx = [
  {
    path: '/main/analysis/overview',
    component: () => import('@/views/main/analysis/overview/Overview.vue')
  },
  {
    path: '/main/analysis/dashboard',
    component: () => import('@/views/main/system/user/User.vue')
  },
  {
    path: '/main/system/user',
    component: () => import('@/views/main/system/user/User.vue')
  },
  {
    path: '/main/system/department',
    component: () => import('@/views/main/system/department/Department.vue')
  },
  {
    path: '/main/system/menu',
    component: () => import('@/views/main/system/menu/Menu.vue')
  },
  {
    path: '/main/system/role',
    component: () => import('@/views/main/system/role/Role.vue')
  }
]
// router.addRoute();

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
