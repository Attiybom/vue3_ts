import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  // 1. 将所有的路由对象存到数组里，以便后续过滤
  const localRoutes: RouteRecordRaw[] = []
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
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
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
  const breadCrumb: IBreadCrumbType[] = []
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

// 树形控件映射id
export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = []

  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recurseGetId(menuList)

  return ids
}

// 菜单映射获取按钮权限数组
export function mapMenuToPermission(menuList: any[]) {
  const permissionArr: string[] = []

  function recurseGetPermission(menus: any[]) {
    for (const item of menus) {
      if (item.type === 3) {
        permissionArr.push(item.permission)
      } else {
        recurseGetPermission(item.children ?? [])
      }
    }
  }
  recurseGetPermission(menuList)

  return permissionArr
}
