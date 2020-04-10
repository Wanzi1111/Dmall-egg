const Controller = require('egg').Controller;

module.exports = class extends Controller{
    async order(){
        this.ctx.sendRes(this.ctx, {
            code:1,
            status: 200
        });
    }
}