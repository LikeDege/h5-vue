import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import configRouter from './routers';
import lazyload from './directives/vue-lazyload';

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
