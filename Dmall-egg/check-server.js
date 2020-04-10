const http = require('http');
const getRandom = (min, max) => {
    const num = Math.floor( min + Math.random() * (max - min) )
    return num
}
const createMessageCode = ()=>{
    let code = '';
    while (code.length < 6) {
      code += getRandom(0, 10);
    }
    return code;
}
http.createServer((req,res)=>{
    if(req.url === '/getcheckCode'){
        const code = createMessageCode();
        console.log(code);
        res.end(code);
    }
}).listen(3000);

