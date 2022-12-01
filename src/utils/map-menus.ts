import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  // 1. 将所有的路由对象存到数组里，以便后续过滤
  let localRoutes: RouteRecordRaw[] = []
  // 2. 动态获取所有路由对象
  const files: Record<string, any> = import.meta.glob(
    '/src/router/main/**/*.ts',
    {
      eager: true
    }
  )
  for (const key in files) {
    const module = files[key]
    // console.log(module.default)
    localRoutes.push(module.default)
  }

  return localRoutes
}

export default function mapMenusToRoutes(userMenus: any[]) {
  // 获取本地菜单数组
  const localRoutes = loadLocalRoutes()

  // 过滤掉没有权限的路由
  let routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) routes.push(route)
    }
  }

  return routes
}
