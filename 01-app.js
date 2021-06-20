const Koa = require('koa');
// 引入实例化路由;
const router = require('koa-router')();
const app = new Koa();

router.get('/', async (ctx) => {
    ctx.body = '首页'
})


router.get('/news', async (ctx) => {
    // 获取get传值
    // 获取对象
    console.log(ctx.query)

    // 获取字符串
    console.log(ctx.querystring)

    // 获取请求头
    // console.log(ctx.request)
    console.log(ctx.request.query)

    // 获取请求utl
    console.log(ctx.url)

    ctx.body = '新闻'
})

// 启动路由
app.use(router.routes())
// 根据 ctx.status 配置响应头
app.use(router.allowedMethods())

app.listen(3000)
