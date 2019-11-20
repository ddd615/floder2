import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui';
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router);
Vue.use(ElementUI);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
  },500);

});

export default router;
