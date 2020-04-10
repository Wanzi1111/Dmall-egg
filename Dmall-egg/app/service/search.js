'use strict';

const Service = require('egg').Service;

class SearchService extends Service {
  async index(search_key) {
    let res = await this.app.mysql.query(`select * from wares where name like '%${search_key}%'`)
    return res;
  }
}

module.exports = SearchService;
