module.exports = addRule => {
    //手机号
    addRule('phone',(rule,value)=>{
        const reg = /^1[38579]\d{9}$/;
        if(!reg.test(value)){
            return '手机号格式有误'
        }
    })
    //邮箱
    addRule('email', (rule, value) => {
        const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if(!emailReg.test(value)){
          return `字段${rule.type}，邮箱可能不符合规则`;
        }
    });
    // 登录的用户密码规则
    addRule('password', (rule, value) => {
        const userPwdReg = /^\w{6,}$/;
        if(!userPwdReg.test(value)){
            return `字段${rule.type},不符合规则，必须是最少6位字母或数字`;
        }
    });
}