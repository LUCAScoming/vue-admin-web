import Vue from 'vue'
import Router from 'vue-router'
import roles from './roles'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     name: 'Dashboard',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: { title: '主页', icon: 'dashboard' }
  //   }]
  // },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/admin/index'),
        name: 'Dashboard',
        meta: { title: '主页', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/ownerInfo',
    component: Layout,
    redirect: '/ownerInfo',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '业主信息',
      icon: 'nested'
    },
    children: [
      { path: 'index', component: () => import('@/views/ownerInfo/index'), name: 'owner-info', meta: { title: '业主信息管理' }},
      { path: 'houseInfo', component: () => import('@/views/ownerInfo/houseInfo'), name: 'house-info', meta: { title: '房产资料管理' }}
    ]
  },
  {
    path: '/card',
    component: Layout,
    redirect: '/card',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '一卡通服务管理',
      icon: 'table'
    },
    children: [
      { path: 'index', component: () => import('@/views/card/index'), name: 'card', meta: { title: '一卡通管理' }},
      { path: 'pay', component: () => import('@/views/card/pay'), name: 'pay', meta: { title: '收费设置' }},
      { path: 'payQuery', component: () => import('@/views/card/payQuery'), name: 'payQuery', meta: { title: '缴费查询' }}
    ]
  },
  {
    path: '/faciManage',
    component: Layout,
    redirect: '/faciManage',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '设施管理',
      icon: 'tree '
    },
    children: [
      { path: 'faciMa', component: () => import('@/views/faciManage/faciMa'), name: 'faciMa', meta: { title: '设备监控管理' }},
      { path: 'billboard', component: () => import('@/views/faciManage/billboardMa'), name: 'billboard', meta: { title: '公告管理' }},
      { path: 'musicMa', component: () => import('@/views/faciManage/musicMa'), name: 'musicMa', meta: { title: '音乐广播管理' }}
    ]
  },
  {
    path: '/car',
    component: Layout,
    redirect: '/car',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '车位管理',
      icon: 'form '
    },
    children: [
      { path: 'carRepire', component: () => import('@/views/car/carRepire'), name: 'carRepire', meta: { title: '车位维护' }},
      { path: 'carManage', component: () => import('@/views/car/carManage'), name: 'carManage', meta: { title: '车位查询' }},
      { path: 'carInOut', component: () => import('@/views/car/carInOut'), name: 'carInOut', meta: { title: '车辆进出' }}
    ]
  },
  {
    path: '/service',
    component: Layout,
    redirect: '/service',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '客服中心',
      icon: 'link'
    },
    children: [
      {
        path: 'complain',
        component: () => import('@/views/service/complain'),
        name: 'complain',
        meta: { title: '投诉建议管理' }
      },
      {
        path: 'serviceMa',
        component: () => import('@/views/service/serviceMa'),
        name: 'serviceMa',
        meta: { title: '服务管理' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
