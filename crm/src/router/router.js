export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    redirect: '/crm',
    children: [{
      path: '/org',
      name: 'org',
      component: () => import('../components/org/org.vue'),
      redirect: '/org/departmentList',
      // 路由元信息
      meta: {
        // 存放的就是自定义属性
        til: "组织结构"
      },
      children: [{
        path: '/org/departmentList',
        name: 'departmentList',
        component: () => import('../components/org/department/list.vue'),
      }, {
        path: '/org/departmentAdd',
        name: 'departmentAdd',
        component: () => import('../components/org/department/add.vue'),
      }, {
        path: '/org/jobList',
        name: 'jobList',
        component: () => import('../components/org/job/list.vue'),
      }, {
        path: '/org/jobAdd',
        name: 'jobAdd',
        component: () => import('../components/org/job/add.vue'),
      }, {
        path: '/org/userList',
        name: 'userList',
        component: () => import('../components/org/user/list.vue'),
      }, {
        path: '/org/userAdd',
        name: 'userAdd',
        component: () => import('../components/org/user/add.vue'),
      }]
    }, {
      // 客户管理页
      path: '/crm',
      name: 'crm',
      component: () => import('../components/crm/crm.vue'),
      // 路由元信息
      meta: {
        // 存放的就是自定义属性
        til: "客户管理"
      },
      redirect: '/crm/list',
      children: [{
        path: '/crm/list',
        name: 'customlist',
        component: () => import('../components/crm/CustomList.vue'),
      }, {
        path: '/crm/create',
        name: 'customcreate',
        component: () => import('../components/crm/CustomCreate.vue'),
      }, {

        path: '/crm/upload',
        name: 'customupload',
        component: () => import('../components/crm/CustomUpload.vue'),

      }, {
        path: '/crm/visit/:customid',
        name: 'visithandle',
        component: () => import('../components/crm/VisitHandle.vue'),
      }, {
        path: '*',
        redirect: {
          path: '/crm/list',
          query: {
            error: 404
          }
        }
      }]
    }]
  },
  {
    // 登陆页
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]
