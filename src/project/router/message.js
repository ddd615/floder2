


const message = {
  routes: [
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
      component: () => import('@/project/views/message/list')
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
      component: () => import('@/project/views/message/show')
    },
  ]
}
export default message;
