'use strict';

/** @type Egg.EggPlugin */
module.exports = {
   // 引入参数校验插件
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  // 启用mysql
  mysql: {
    enable: true,
    convert: true,
    package: 'egg-mysql',
  },
  cors:{
    enable: true,
    package: 'egg-cors',
  }
};
