const statusData = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
  };
  /**
   * 
   * @param {Context} ctx 上下文对象 
   * @param {Objct} options
   * @options {number} status http状态码
   * @options {number} code 是否成功code码， 仅有0和1
   * @options {string} msg 本次请求的说明 默认为状态码说明
   * @options {json} data 本次请求的实体数据，不一定存在
   * @return {void}   
   */
  const response = (ctx, options = {}) => {
    let {status = 200, code = 1, msg, data} = options;
    ctx.status = status;
    const statusMsg = statusData[status];
    if(!msg){
      msg = statusData[status];
    }
    const body = {code,msg,statusMsg, status};
    if(data){
      body.data = data;
    }
    ctx.body = body;
  };

  module.exports = {
    response
  }