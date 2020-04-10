'use strict';

const Controller = require('egg').Controller;
const uid = require('node-uid')
class HomeController extends Controller {
  async banner() {
    let data = await this.ctx.service.home.banner();
    this.ctx.sendRes(this.ctx, {
        code: 1,
        status: 200,
        data
    });
    
  }
  async addBanner(){
    let required = ["image" ,"url","start_time","end_time","active_name"];
    let {body:bannerInfo} = this.ctx.request;
    if(!required.every(item=>bannerInfo[item])){
        this.ctx.sendRes(this.ctx, {
            code: 0,
            status: 400,
            msg: '缺少参数'
          });
        return;
    }
    bannerInfo.id = uid(15);
    let data = await this.ctx.service.home.addBanner(bannerInfo);
    if(data){
        this.ctx.sendRes(this.ctx, {
            code: 1,
            status: 200,
            msg:'添加成功'
        });
    }
  }
  async editBanner(){
    let required = ["image" ,"url","start_time","end_time","active_name","id"];
    let {body:bannerInfo} = this.ctx.request;
    if(!required.every(item=>bannerInfo[item])){
        this.ctx.sendRes(this.ctx, {
            code: 0,
            status: 400,
            msg: '缺少参数'
          });
        return;
    }
    let data = await this.ctx.service.home.editBanner(bannerInfo);
    if(data){
        this.ctx.sendRes(this.ctx, {
            code: 1,
            status: 200,
            msg:'修改成功'
        });
    }
  }
  async delBanner(){
    let {id} = this.ctx.request.body;
    if(id){
      await this.ctx.service.home.delBanner(id);
      this.ctx.sendRes(this.ctx, {
          code: 1,
          status: 200,
          msg:'删除成功'
      });
      return;
    }
    this.ctx.sendRes(this.ctx, {
      code: 0,
      status: 400,
      msg: '缺少参数'
    });
  }
  async shop(){
      let {pageid = 0,limit = 10} = this.ctx.request.query;
      //volume 销量
      let data = await this.ctx.service.home.shop(pageid*1,limit*1);
      if(data){
        this.ctx.sendRes(this.ctx, {
            code: 1,
            status: 200,
            data
        });
    }
  }
}

module.exports = HomeController;
