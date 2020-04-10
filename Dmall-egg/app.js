module.exports = app => {
    let {addControllerRules,List} = app.config;
    const coreMiddlewareList = new List(app.config.coreMiddleware);
    // 文件列表中间件
    coreMiddlewareList.insert('gzip','meta');
    addControllerRules(app.validator.addRule);
}