'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const uid = require('node-uid')
const fs = require('fs')
class UploadController extends Controller {
  async images() {
    const {ctx} = this;
    const file = ctx.request.files[0];
    const filename = '/public/images/img_' + uid(15) + '_' + path.basename(file.filename).replace(/[\%\$\{\]\}\[\(\)\s]+/g,'');
    const name = path.join(__dirname,'../',filename);
    let rs = fs.createReadStream(file.filepath);
    let ws = fs.createWriteStream(name)// 创建写入流
    await rs.pipe(ws) // 开始写入
    this.ctx.sendRes(this.ctx, {
        code: 1,
        status: 200,
        data: {
            filename
        }
    })
  }
}

module.exports = UploadController;
