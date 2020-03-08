/**
 * author chao 
 * Email chaoCoding@github.com
 */
const Router = require('koa-router')
const axios = require('axios')
const _ = require('lodash')
const router = new Router()

// 假的URL 转换真实的URL
function MyReplace(data){   
    return new Promise(async (resolve,reject)=>{
        var res = await axios.get(data)
        delete res.data
        const info = {url:_.mapValues(res.request.res.req,'responseUrl').res}
        resolve(info)
        reject('错误')
    })
}

router.post('/api/douyin',async (ctx,next)=>{
    try{
        const res = await axios.get(ctx.request.body.url)
        var reg = /(?<=playAddr: ").*?(?=")/ //匹配
        var resUrl = _.replace(reg.exec(res.data)[0],'playwm','play') //解析
        let data = await MyReplace(resUrl)//匹配重定向模拟移动端隐藏地址
        ctx.body = {code:200,data:data,msg:'解析成功'}
    }catch(err){
        ctx.body = {code:99999,data:{},msg:'地址可能错误'}
    }
  })




  
  

module.exports = router