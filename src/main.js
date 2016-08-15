import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import configRouter from './routers';
import * as filters from './filters';
import lazyload from './directives/vue-lazyload';

// 过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(lazyload);
Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
  hashbang: false,
  history: true,
  saveScrollPosition: true,
});
configRouter(router);
router.beforeEach((transition) => {
  document.body.scrollTop = 0;
  transition.next();
});
router.start(Vue.extend(App), '#app');
