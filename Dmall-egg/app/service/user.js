'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async registry(obj) {
    let {app} = this;
    let res = await app.mysql.insert('user',obj);
    return res;
  }
}

module.exports = UserService;
