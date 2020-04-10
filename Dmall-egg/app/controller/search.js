'use strict';

const Controller = require('egg').Controller;

class SearchController extends Controller {
  async index() {
    let {search_key} = this.ctx.query;
    if(!search_key){
        this.ctx.sendRes(this.ctx,{
            code:0,
            statusCode:400,
            msg:'缺少参数'
        })
        return;
    }
    let data = await this.ctx.service.search.index(search_key);
    this.ctx.sendRes(this.ctx,{
        code:1,
        statusCode:200,
        data
    })
  }
}

module.exports = SearchController;
