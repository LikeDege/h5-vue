export default (router) => router.map({
  '/': {
    name: 'index',
    component(resolve) {require(['./views/index'], resolve);},
  },
  '/journey/list': {
    name: 'journeyList',
    component(resolve) {require(['./views/journey/list'], resolve);},
  },

});
