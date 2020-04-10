'use strict';

const Service = require('egg').Service;

class CarService extends Service {
  async addCar(userid,shopid) {
    let findshop = await this.app.mysql.get('wares',{
        id:shopid
    });
    if(!findshop || !userid){
        return {
            code:0,
            msg:'参数错误'
        }
    }
    let allshop = await this.app.mysql.get('shopcar',{
        shopid,
        userid
    });
    if(allshop){
        await this.app.mysql.update('shopcar',{
            id:allshop.id,
            count:allshop.count+1
        })
        return {
            code:1,
            msg:'添加购物车件数更新成功'
        }
    }
    await this.app.mysql.insert('shopcar',{
        userid,
        shopid,
        count:1
    })
    return {
        code:1,
        msg:'添加购物车成功'
    }  
  }
  async removeCar(userid,shopid){
    let findshop = await this.app.mysql.select('wares',{
        where:{
            id:shopid
        }
    });
    if(!findshop.length || !userid){
        return {
            code:0,
            msg:'参数错误'
        }
    }
    let allshop = await this.app.mysql.select('shopcar',{
        where:{
            shopid
        }
    });
    if(!allshop.length){
        return {
            code:0,
            msg:'参数错误'
        }
    }else{
        if(allshop[0].count<=1){
            return {
                code:0,
                msg:'参数错误'
            }
            return;
        }
        this.app.mysql.update('shopcar',{
            id:allshop[0].id,
            count:allshop[0].count-1
        })
        return {
            code:1,
            msg:'购物车件数更新成功'
        }
    }
  }
  async removeShop(userid,shopid){
      let data = await this.app.mysql.delete('shopcar',{
        userid,
        shopid
      });
      return data;
  }
  async getCar(userid){
    let shopids = await this.app.mysql.select('shopcar',{
        where:{
            userid
        }
    });
    for(let val of shopids){
        let shopdata = await this.app.mysql.select('wares',{
            where:{
                id:val.shopid
            }
        });
        val.shopdata = shopdata[0];
    }
    return shopids;
  }
}

module.exports = CarService;
