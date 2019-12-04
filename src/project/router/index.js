import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui';
import login from './login'
import user from  './user.js'
import role from './role'
import manager from './manager'
import advice from './advice'
import message from './message'

Vue.use(Router);
Vue.use(ElementUI);

let routeList = [
  login.routes,
  manager.routes,
  user.routes,
  role.routes,
  advice.routes,
  message.routes
];

let routes = [];

//拼接路由
routeList.map(s => {
  routes = routes.concat(s);
});

const router = new Router({
  routes: routes
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
