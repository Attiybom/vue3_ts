import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  // 1. 将所有的路由对象存到数组里，以便后续过滤
  let localRoutes: RouteRecordRaw[] = []
  // 2. 动态获取所有路由对象
  const files: Record<string, any> = import.meta.glob(
    // 扫描
    '/src/router/main/**/*.ts', //扫描该路径下的所有ts文件
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

// 首次进入main，匹配第一个菜单
export let firstMenu: any = null

export default function mapMenusToRoutes(userMenus: any[]) {
  // 获取本地菜单数组
  const localRoutes = loadLocalRoutes()

  // 过滤掉没有权限的路由
  let routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        if (!(routes.find(item => item.path === menu.url) )) {
          routes.push({ path: menu.url, redirect: route.path})
        }
        routes.push(route)
      }

      if (!firstMenu && route) {
        firstMenu = submenu
      }
    }
  }

  // console.log(firstMenu)

  return routes
}

// path:需要匹配的路径
// userMenus: 遍历的菜单
// export function mapPathToMenu(path: string, userMenus: any[]) {
//   for (const menu of userMenus) {
//     for (const submenu of menu.children) {
//       if (path === submenu.url) {
//         return submenu
//       }
//     }
//   }
// }

interface IBreadCrumbType {
  name: string
  path: string
}

export function mapPathToBreadCrumb(path: string, userMenus: any[]) {
  let breadCrumb: IBreadCrumbType[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (path === submenu.url) {
        breadCrumb.push({ name: menu.name, path: menu.url })
        breadCrumb.push({ name: submenu.name, path: submenu.url })
        return breadCrumb
      }
    }
  }
}

/*
拿到第二个
再拿到过滤后路由数组的第一个


*/
