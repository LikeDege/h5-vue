export default (router) => router.map({
  '/': {
    name: 'index',
    component(resolve) {require(['./views/index'], resolve);},
  },
  '/journey/list': {
    name: 'journeyList',
    component(resolve) {require(['./views/journey/list'], resolve);},
  },
  '/destination/list': {
    name: 'destinationList',
    component(resolve) {require(['./views/destination/list'], resolve);},
  },
});
