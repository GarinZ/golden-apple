import Vue from 'vue';
import iView from 'iview';
// import './assets/css/uxmap-theme.less';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueClipboard from 'vue-clipboard2';
import vuescroll from 'vuescroll';
import VueQuillEditor from 'vue-quill-editor';
import Routers from '@/router';

import Util from '@/libs/util';
import App from '@/app';
import 'vuescroll/dist/vuescroll.css';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import store from '@/store';
import Mixin from './mixin';

Vue.use(VueQuillEditor);
Vue.use(VueRouter);
Vue.use(iView);
Vue.use(Vuex);
Vue.mixin(Mixin);
Vue.use(vuescroll);
Vue.use(VueClipboard);

// 路由配置
const RouterConfig = {
  routes: Routers,
};
const router = new VueRouter(RouterConfig);
// 通过iView设置loadingBar
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  Util.title(to.meta.title);
  next();
});
router.afterEach(() => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});

Vue.directive('clickoutside', {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }

    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener('click', documentHandler);
  },
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  },
});
// 防重复点击(指令实现)
Vue.directive('preventDbClick', {
  inserted(el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true;
        setTimeout(() => {
          el.disabled = false;
        }, binding.value || 3000);
      }
    });
  },
});

new Vue({
  el: '#app',
  store,
  router,
  render: (h) => h(App),
});
