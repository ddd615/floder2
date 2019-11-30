export default user;


const user = {
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path: '/index',
      name: 'Welcome',
      meta:{
        breadcrumb:[
          {
            name:'message.index',
            path:'/index'
          }
        ],
        isShowLeftSider:true,
        isShowHeader:true,
      },
      component: () => import('@/views/Welcome.vue')
    },
    {
      path:'/login',
      name:'login',
      meta:{
        isShowHeader:true,
        isShowLeftSider:false,
      },
      component: () => import( '@/views/Login.vue'),
    },
    {
      path:'/manager/list',
      name:'managerList',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        keepAlive:true,
        breadcrumb: [
          {
            name:'message.index',
            path:'/index'
          },
          {
            name:'message.manager',
            path:'/manager/list'
          }
        ]
      },
      component: () => import('@/views/manager/list')
    },
    {
      path:'/manager/show/:id',
      name:'managerShow',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'管理员列表',
            path:'/manager/list'
          },
          {
            name:'管理员详情',
            path:'/manager/show/:id'
          }
        ]
      },
      component: () => import('@/views/manager/show')
    },
    {
      path:'/role/list',
      name:'roleList',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        keepAlive:true,
        breadcrumb: [
          {
            name:'message.index',
            path:'/index'
          },
          {
            name:'message.role',
            path:'/role/list'
          }
        ]
      },
      component: () => import('@/views/role/list')
    },
    {
      path:'/role/show/:id',
      name:'roleShow',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'角色列表',
            path:'/role/list'
          },
          {
            name:'角色详情',
            path:'/role/show/:id'
          }
        ]
      },
      component: () => import('@/views/role/show')
    },
    {
      path:'/user/list',
      name:'userList',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        keepAlive:true,
        breadcrumb: [
          {
            name:'message.index',
            path:'/index'
          },
          {
            name:'message.user',
            path:'/user/list'
          }
        ]
      },
      component: () => import('@/views/user/list')
    },
    {
      path:'/user/show/:id',
      name:'userShow',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'用户列表',
            path:'/user/list'
          },
          {
            name:'用户详情',
            path:'/user/show/:id'
          }
        ]
      },
      component: () => import('@/views/user/show')
    },
    {
      path:'/advice/list',
      name:'adviceList',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        keepAlive:true,
        breadcrumb: [
          {
            name:'message.index',
            path:'/index'
          },
          {
            name:'message.advice',
            path:'/advice/list'
          }
        ]
      },
      component: () => import('@/views/advice/list')
    },
    {
      path:'/advice/show/:id',
      name:'adviceShow',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'意见反馈',
            path:'/advice/list'
          },
          {
            name:'意见反馈详情',
            path:'/advice/show/:id'
          }
        ]
      },
      component: () => import('@/views/advice/show')
    },
    {
      path:'/message/list',
      name:'messageList',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        keepAlive:true,
        breadcrumb: [
          {
            name:'message.index',
            path:'/index'
          },
          {
            name:'message.message',
            path:'/message/list'
          }
        ]
      },
      component: () => import('@/views/message/list')
    },
    {
      path:'/message/show/:id',
      name:'messageShow',
      meta:{
        isShowHeader:true,
        isShowLeftSider:true,
        breadcrumb: [
          {
            name:'首页',
            path:'/index'
          },
          {
            name:'消息管理',
            path:'/message/list'
          },
          {
            name:'消息详情',
            path:'/message/show/:id'
          }
        ]
      },
      component: () => import('@/views/message/show')
    },
  ]
}
