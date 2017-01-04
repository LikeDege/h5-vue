export default [{//首页
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
  {//玩法录入
    path: '/journey/create',
    component(resolve) {require(['./views/journey/create/index'], resolve);},
    children: [
      {//玩法简介
        path: '',
        name: 'intro',
        component(resolve) {require(['./views/journey/create/introduce'], resolve);},
      },
      {//玩法服务及定价
        path: 'price',
        name: 'price',
        component(resolve) {require(['./views/journey/create/price'], resolve);},
      },
      {//玩法退改及其它
        path: 'unsubscribe',
        name: 'unsubscribe',
        component(resolve) {require(['./views/journey/create/unsubscribe'], resolve);},
      },
      {//玩法体验描述
        path: 'desc',
        name: 'desc',
        component(resolve) {require(['./views/journey/create/description'], resolve);},
      },
      {//玩法录入成功
        path: 'succ',
        name: 'succ',
        component(resolve) {require(['./views/journey/create/success'], resolve);},
      },
    ],
  },
  {//目的地列表
    path: '/destination/list',
    name: 'destinationList',
    component(resolve) {require(['./views/destination/list'], resolve);},
    meta: { scrollToTop: true },
  },
];
