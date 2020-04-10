'use strict';

const Controller = require('egg').Controller;

class ShopController extends Controller {
  async allShop() {
     let data = await this.ctx.service.shop.getAllShop()
     this.ctx.sendRes(this.ctx, {
      code: 1,
      status: 200,
      data: data
    })
  }
  async getType(){
    let data = await this.ctx.service.shop.getType()
    this.ctx.sendRes(this.ctx, {
      code: 1,
      status: 200,
      data: data
    })
  }
  async getCategory(){
    let data = await this.ctx.service.shop.getCategory()
    this.ctx.sendRes(this.ctx, {
      code: 1,
      status: 200,
      data: data
    })
  }
  async shopType(){
    let data = await this.ctx.service.shop.getAllType();
    this.ctx.sendRes(this.ctx, {
      code: 1,
      status: 200,
      data: data
    })
  }
  async selectType(){
    let {type_id,category_id,pageid,limit} = this.ctx.query;
    if(!type_id){
      this.ctx.sendRes(this.ctx, {
        code: 0,
        status: 400,
        msg: '缺少参数'
      });
      return;
    }
    let data = await this.ctx.service.shop.selectType({
      type_id,
      category_id:category_id ? category_id : 'all',
      pageid:pageid*1 ? pageid*1 : 0,
      limit:limit*1 ? limit*1 : 10
    })
    this.ctx.sendRes(this.ctx, {
      code: 1,
      status: 200,
      data
    });
  }
  async addType(){
    let {type_name} = this.ctx.query;
    if(!type_name){
      this.ctx.sendRes(this.ctx, {
        code: 0,
        status: 400,
        msg: '缺少参数'
      });
      return;
    }
    let data = await this.ctx.service.shop.addType(type_name)
    if(data){
      this.ctx.sendRes(this.ctx, {
        code: 1,
        status: 200,
        msg:'添加成功'
      });
    }
  }
  async addCategory(){
    let {type_id,category_name} = this.ctx.query;
    if(!type_id || !category_name){
      this.ctx.sendRes(this.ctx, {
        code: 0,
        status: 400,
        msg: '缺少参数'
      });
      return;
    }
    let data = await this.ctx.service.shop.addCategory(type_id,category_name)
    if(data){
      this.ctx.sendRes(this.ctx, {
        code: 1,
        status: 200,
        msg:'添加成功'
      });
    }
  }
  async addShop(){
    let {body:shopinfo} = this.ctx.request;
    let required = ['name','type_id','cover','pictures','detail','price','old_price','stock','volume',,'category_id','specs']
    let create_time = new Date();
    if(!required.every(key=>shopinfo[key])){
      this.ctx.sendRes(this.ctx, {
        code: 0,
        status: 400,
        msg: '缺少参数'
      });
      return;
    }
    let data = await this.ctx.service.shop.addShop({
      ...shopinfo,
      create_time
    })
    if(data){
      this.ctx.sendRes(this.ctx, {
        code: 1,
        status: 200,
        msg:'添加成功'
      });
    }
   
    //name 商品名称
    //type_id 分类id
    //cover 主图
    //pictures 图片
    //detail 商品详情
    //price 价格
    //old_price 原价
    //stock 库存
    //volume 销量
    // category_id 子类id
    //specs 商品规格
  }

  async removeShop(){
    let {id} = this.ctx.query;
    if(id){
      let res = await this.service.shop.removeShop(id);
      if(res){
        this.ctx.sendRes(this.ctx, {
          code: 1,
          status: 200,
          msg:'删除成功'
        });
      }
    }
  }
}

module.exports = ShopController;
