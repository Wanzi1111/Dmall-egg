'use strict';

const Service = require('egg').Service;
let node_uid = require('node-uid');
class ShopService extends Service {
  async getAllShop() {
    let res = await this.app.mysql.select('wares');
    return res;
  }
  async getCategory() {
    let res = await this.app.mysql.select('category');
    return res;
  }
  async getType() {
    let res = await this.app.mysql.select('typeparent');
    return res;
  }
  async getAllType(){
    let allType = await this.app.mysql.select('category');
    let parentType = await this.app.mysql.select('typeparent');
    let res = parentType.map(item=>{
      return {
        title:item.title,
        id:item.id,
        children:allType.filter(val=>val.parent_id===item.id)
      }
    })
    return res;
  }
  async selectType({type_id,category_id,pageid,limit}){
    if(category_id==='all'){
      let res = await this.app.mysql.select('wares',{
        where:{ type_id },
        limit:limit,
        offset:pageid*limit
      })
      return res;
    }else{
      let res = await this.app.mysql.select('wares',{
        where:{ category_id }
      })
      return res;
    }
  }
  async addType(title){
    let res = await this.app.mysql.insert('typeparent',{
      id:node_uid(15),
      title
    });
    return res;
  }
  async addCategory(parent_id,name){
    let res = await this.app.mysql.insert('category',{
      id:node_uid(15),
      name,
      parent_id
    });
    return res;
  }
  async addShop(options){
    
    let res = await this.app.mysql.insert('wares',{
      ...options
    })
    return res;
  }
  async removeShop(id){
    let res = await this.app.mysql.delete('wares',{
      id
    })
    return res;
  }
}

module.exports = ShopService;
