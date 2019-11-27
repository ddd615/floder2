import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui';


Vue.use(Router);
Vue.use(ElementUI);

const router = new Router({
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
    }
  ]
});

router.beforeEach((to,from,next) => {
  const loading = ElementUI.Loading.service({
    lock: true,
    text: '加载中',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });

  next();
});

router.afterEach(route => {
  const loading = ElementUI.Loading.service({
    lock: true,
    text: '加载中',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  //将滚动条恢复到最顶端
  window.scrollTo(0, 0);
  setTimeout(() => {
     loading.close();
  },200);

});

export default router;
