export default [{
    path: '/',
    name: 'index',
    component(resolve) {require(['./views/index'], resolve)},
  },
  {
    path: '/journey/list',
    name: 'journeyList',
    component(resolve) {require(['./views/journey/list'], resolve)},
    meta: { scrollToTop: true },
  },
  {
    path: '/destination/list',
    name: 'destinationList',
    component(resolve) {require(['./views/destination/list'], resolve);},
    meta: { scrollToTop: true },
  }
];
