'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  //客户端
  router.get('/user/getUserInfo',controller.user.getUserInfo);
  //注册
  router.post('/user/registry', controller.user.registry);
  //登陆
  router.post('/user/login', controller.user.login);
  //验证码
  router.post('/user/checkCode', controller.user.checkCode);
  //获取分类页面所有分类
  router.get('/shop/shopType',controller.shop.shopType);
  //筛选商品接口
  router.get('/shop/selectType',controller.shop.selectType);
  //获取首页商品
  router.get('/home/shop',controller.home.shop)
  //提交订单
  router.post('/submit/order',controller.submit.order);
 

  //获取首页轮播
  router.get('/home/banner',controller.home.banner);
  //添加首页轮播
  router.post('/home/addBanner',controller.home.addBanner);
  //编辑首页轮播
  router.post('/home/editBanner',controller.home.editBanner);
  //删除首页轮播
  router.post('/home/delBanner',controller.home.delBanner);



  //后台管理系统
  //登陆
  router.post('/admin/login', controller.user.adminLogin);
  //获取信息
  router.get('/admin/getUserInfo', controller.user.getUserInfo);
  //添加商品分类
  router.get('/shop/addType',controller.shop.addType);
  //添加商品分类子分类
  router.get('/shop/addCategory',controller.shop.addCategory);
  //添加商品
  router.post('/shop/addShop',controller.shop.addShop);
  //获取商品分类
  router.get('/shop/getType',controller.shop.getType);
  //获取商品子分类
  router.get('/shop/getCategory',controller.shop.getCategory);
  //获取所有商品
  router.get('/shop/allShop',controller.shop.allShop);
  //删除商品
  router.get('/shop/removeShop',controller.shop.removeShop)
  //富文本编辑器
  router.all('/ueditor',controller.ueditor.index);

  //图片预览
  router.post('/upimage',controller.upload.images)


  //购物车 
  router.get('/car/getCar',controller.car.getCar)
  //添加
  router.post('/car/addCar',controller.car.addCar)
  //减少商品件数
  router.post('/car/removeCar',controller.car.removeCar)
  //删除购物车商品
  router.post('/car/removeShop',controller.car.removeShop)


  //搜索
  router.get('/search',controller.search.index)
};
