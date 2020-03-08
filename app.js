const Koa = require('koa')
const app = new Koa()
const router = require('./router.js') //路由
const bodyparser = require('koa-bodyparser')//处理post请求
const cors = require('koa2-cors'); // cors

app.use(cors()); //开启全局跨域
app.use(bodyparser())
app
  .use(router.routes())
  .use(router.allowedMethods())
app.listen(3000,()=>{
  console.log('ok 3000');
})