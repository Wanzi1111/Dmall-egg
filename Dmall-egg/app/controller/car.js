'use strict';

const Controller = require('egg').Controller;

class CarController extends Controller {
  async getCar(){
    let {user_id} = this.ctx.query;
    if(!user_id){
      this.ctx.sendRes(this.ctx, {
          code:0,
          status: 400,
          msg:'缺少参数'
      });
      return;
    }
    let data = await this.ctx.service.car.getCar(user_id)
    this.ctx.sendRes(this.ctx, {
      code:1,
      status: 200,
      data
    });
  }
  async addCar() {
    let ctx = this.ctx;
    let {user_id,shop_id} = ctx.request.body;
    if(!user_id || !shop_id){
        this.ctx.sendRes(this.ctx, {
            code:0,
            status: 400,
            msg:'缺少参数'
        });
        return;
    }
    let data = await ctx.service.car.addCar(user_id,shop_id);
    this.ctx.sendRes(this.ctx, {
        ...data,
        status: data.code ? 200 : 400,
    });

  }
  async removeCar(){
    let ctx = this.ctx;
    let {user_id,shop_id} = ctx.request.body;
    if(!user_id || !shop_id){
        this.ctx.sendRes(this.ctx, {
            code:0,
            status: 400,
            msg:'缺少参数'
        });
        return;
    }
    let data = await ctx.service.car.removeCar(user_id,shop_id);
    this.ctx.sendRes(this.ctx, {
        ...data,
        status: data.code ? 200 : 400,
    });
  }
  async removeShop(){
    let {user_id,shop_id} = this.ctx.request.body;
    if(!user_id || !shop_id){
        this.ctx.sendRes(this.ctx, {
            code:0,
            status: 400,
            msg:'缺少参数'
        });
        return;
    }
    try{
      await this.ctx.service.car.removeShop(user_id,shop_id)
      this.ctx.sendRes(this.ctx,{
        code:1,
        msg:'success'
      })
    }catch(error){
      this.ctx.sendRes(this.ctx,{
        code:0,
        msg:'error'
      })
    }
    
  }
}

module.exports = CarController;
