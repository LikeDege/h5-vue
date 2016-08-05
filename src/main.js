import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import configRouter from './routers';
import lazyload from './directives/vue-lazyload';

Vue.use(lazyload);
Vue.use(VueResource);
Vue.use(VueRouter);

Vue.http.interceptors.push((request, next) => {
    // continue to next interceptor
    next((response) => {
    	if(!response.data || response.data.returnCode != 0) {
    		response.ok = false;
    	}
		return response;
	});
});

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
