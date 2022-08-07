import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
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
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "主页",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "主页", icon: "dashboard" },
      },
    ],
  },

  {
    path: "/commodity",
    component: Layout,
    redirect: "/commodity/table",
    name: "商品管理",
    meta: { title: "商品", icon: "el-icon-s-help" },
    children: [
      {
        path: "commodity/list",
        name: "商品列表",
        component: () => import("@/views/commodity/index"),
        meta: { title: "商品列表", icon: "table" },
      },
      {
        path: "commodity/add",
        name: "新增商品",
        component: () => import("@/views/commodity/add"),
        meta: { title: "新增商品", icon: "tree" },
      },
      {
        path: "tree",
        name: "热卖商品",
        component: () => import("@/views/hot/index"),
        meta: { title: "热卖商品", icon: "list" },
      },
    ],
  },

  {
    path: "/user",
    component: Layout,
    name: "用户管理",
    meta: { title: "用户管理", icon: "el-icon-user" },
    children: [
      {
        path: "index",
        name: "用户列表",
        component: () => import("@/views/user/index"),
        meta: { title: "用户列表", icon: "form" },
      },
      {
        path: "blackhall",
        name: "黑名单",
        component: () => import("@/views/user/blackHall"),
        meta: { title: "黑名单", icon: "form" },
      },
    ],
  },

  {
    path: "/admin",
    component: Layout,
    redirect: "/admin",
    name: "管理员",
    meta: {
      title: "管理员",
      icon: "admin",
    },
    children: [
      {
        path: "create",
        name: "创建管理员",
        component: () => import("@/views/admin/create"),
        meta: { title: "创建管理员", icon: "form" },
      },
      {
        path: "list",
        name: "管理员列表",
        component: () => import("@/views/admin/list"),
        meta: { title: "管理员列表", icon: "form", keepAlive: true },
      },
      {
        path: "permission",
        name: "管理员权限",
        component: () => import("@/views/nested/menu2/index"),
        meta: { title: "管理员权限", icon: "form" },
      },
    ],
  },

  {
    path: "/oder",
    component: Layout,
    redirect: "/oder",
    name: "订单管理",
    meta: { title: "订单管理", icon: "el-icon-user" },
    children: [
      {
        path: "oder/list",
        name: "订单列表",
        component: () => import("@/views/oder/list"),
        meta: { title: "订单列表", icon: "form" },
      },
      {
        path: "oder/handle",
        name: "订单处理",
        component: () => import("@/views/oder/detail"),
        meta: { title: "订单处理", icon: "form" },
      },
    ],
  },

  {
    path: "/dwc",
    component: Layout,
    redirect: "/dwc",
    name: "优惠/补偿",
    meta: { title: "优惠/补偿", icon: "el-icon-user" },
    children: [
      {
        path: "compensate",
        name: "补偿",
        component: () => import("@/views/dwc/compensate"),
        meta: { title: "补偿", icon: "form" },
      },
      {
        path: "welfarevoucher",
        name: "福利券",
        component: () => import("@/views/dwc/welfarevoucher"),
        meta: { title: "福利券", icon: "form" },
      },
    ],
  },

  // {
  //   path: "/complaint",
  //   component: Layout,
  //   name: "投诉/退货",
  //   meta: { title: "投诉/退货", icon: "el-icon-user" },
  //   children: [
  //     {
  //       path: "complaint/list",
  //       name: "投诉列表",
  //       component: () => import("@/views/complaint/list"),
  //       meta: { title: "投诉列表", icon: "form" },
  //     },
  //     {
  //       path: "complaint/return",
  //       name: "退货列表",
  //       component: () => import("@/views/complaint/return"),
  //       meta: { title: "退货列表", icon: "form" },
  //     },
  //   ],
  // },

  // {
  //   path: "external-link",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "https://panjiachen.github.io/vue-element-admin-site/#/",
  //       meta: { title: "External Link", icon: "link" },
  //     },
  //   ],
  // },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
