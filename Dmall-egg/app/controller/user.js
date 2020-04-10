'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');
const axios = require('axios');
const {getIdentityName} = require('../../config/identityList')
function createToken(userInfo, key){
  // 签发token
  let token = jwt.sign(userInfo, key);
  return token;
}
class UserController extends Controller {
  constructor(props){
    super(props);
    this.statuShow = {
      msg400: (msg) => this.ctx.sendRes(this.ctx, {
        code: 0,
        status: 400,
        msg: msg
      }),
      successData: (data) => this.ctx.sendRes(this.ctx, {
        code: 1,
        status: 200,
        data: data
      })
    };
  }
  async getUserInfo(){
    this.statuShow['successData']({
      ...this.ctx.token
    });
  }
  async login(){
    // 验证用户明和面是否符合规则
    let {body:userinfo} = this.ctx.request;
    let isSucc = this.app.validator.validate({
      phone:{
        type:'phone',
        required:true
      }
    },userinfo);
    if(isSucc){
      this.statuShow['msg400']('手机号格式有误！');
      return;
    }
    // 验证是否有用户名和密码
    let {phone, checkcode} = userinfo;
    let sql = `select * from user where phone="${phone}"`;
    let userResult = await this.app.mysql.query(sql);
    if(userResult.length === 0){
      this.statuShow['msg400']('没有该用户');
      return;
    }
    if(!checkcode){
      this.statuShow['msg400']('验证码不正确或已失效！');
      return;
    }
    if(this.ctx.session.checkCode == checkcode){
      let userInfo = {
        signTime:new Date().getTime(),
        ...userResult[0],
      };
      let token = createToken(userInfo, this.ctx.app.config.keys);
      this.statuShow['successData']({
        token: token,
      });
    }else{
      this.statuShow['msg400']('验证码不正确或已失效！');
    }
  }
  async registry(){
    let isrule = this.app.validator.validate({
        phone:{
          type:'phone',
          required:true
        },
        password:{
          type:'password',
          required:true
        }
    },this.ctx.request.body);
    if(isrule){
      this.statuShow['msg400'](isrule[0]);
      return;
    }
    let {body:userinfo} = this.ctx.request;
    let keys = Object.keys(userinfo).find(item=>{
      return userinfo[item] !== '' && item !== 'password'
    })
    if(!keys){
      this.statuShow['msg400']('请输入用户名或邮箱或手机号');
      return;
    }
    let sql = `select * from user where phone="${userinfo.phone}"`;
    let userResult = await this.app.mysql.query(sql);
    if(userResult.length){
      this.statuShow['msg400']('用户已经存在');
      return;
    }
    userinfo.created_at = new Date();
    try{
      await this.ctx.service.user.registry(userinfo);
      this.statuShow['successData']({
        message:'注册成功'
      })
    }catch(error){
      this.statuShow['msg400']('注册失败');
    }
  }
  async checkCode(){
    let {body:userinfo} = this.ctx.request;
    let {phone} = userinfo;
    //手机号
    let isrule = this.app.validator.validate({
        phone:{
          type:'phone',
          required:true
        }
    },userinfo);
    if(isrule){
      this.statuShow['msg400']('手机号格式有误');
      return;
    }
    let sql = `select * from user where phone="${phone}"`;
    let userResult = await this.app.mysql.query(sql);
    if(userResult.length === 0){
      this.statuShow['msg400']('没有该用户');
      return;
    }
    const code = await axios.get('http://localhost:3000/getcheckCode');
    this.ctx.session.checkCode = code.data;
    this.ctx.session.maxAge = 60000; //过期时间一分钟
    this.statuShow['successData']({
      message:'验证码获取成功'
    });
  }
  
  async adminLogin(){
    let {password,username} = this.ctx.request.body;
    let sql = `select * from admin where username="${username}" and password="${password}"`;
    let userResult = await this.app.mysql.query(sql);
    if(userResult[0]){
      let token = createToken({username,identity:getIdentityName(userResult[0].authorityid)}, this.ctx.app.config.keys);
      this.statuShow['successData']({
        username:username,
        loginTime:new Date()*1,
        token: token,
      });
    }else{
      this.statuShow['msg400']('用户名或密码输入有误');
    }
  }
}

module.exports = UserController;
