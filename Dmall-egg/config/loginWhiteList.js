const loginWhiteList = [
  {url: '/user/login', method: 'POST'},
  {url: '/user/registry', method: 'POST'},
  {url: '/user/checkCode', method: 'POST'},
  {url: '/admin/login', method: 'POST'} ,
  {url:'/shop/shopType',method:'GET'},
  {url:'/shop/selectType',method:'GET'},
  {url:'/upimage',method:'POST'},
  {url:'/home/banner',method:'GET'},
  {url:'/home/shop',method:'GET'},
  {url:'/search',method:'GET'},
  {url:'/test',method:'All'}
];
module.exports = loginWhiteList;