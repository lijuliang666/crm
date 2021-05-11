import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import './assets/common.less';
// 导入数据接口
import api from './api/index';

Vue.prototype.$api = api;
Vue.config.productionTip = false

// 导航守卫
router.beforeEach((to, from, next) => {
  //console.log(to, from);
  // 根据是否登录 来判断 能否进入后续的页面
  // to 要去哪个页面
  // from 代表从哪个页面过来的
  // next() 是接着向下走的意思 可以接收参数 参数就是我们要跳转的路径
  // 在这里我们可以做一下 登录判断，若没有登录 就直接跳转到登录页，若登录就往下接着走
  document.title = to.meta.til || "CRM管理系统"; //利用路由元信息改变title
  if (to.name == 'Login') {
    // 如果当前要跳转的是登录页面，就不在继续像下走了，
    next();
    return;
  }
  if (store.state.userInfo.userName) {
    next();
  } else {
    next('/login');
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
