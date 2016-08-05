export default (router) => router.map({
  '/': {
    name: 'index',
    component(resolve) {require(['./views/index'], resolve);},
  }
});
