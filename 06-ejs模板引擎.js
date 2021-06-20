// 安装 koa-views  和 ejs
const Koa = require('koa');
const router = require('koa-router')();
const views = require('koa-views');

const app = new Koa();

// 配置第三方中间件
// 解析ejs文件
app.use(views(`${__dirname}/views`, {extension: 'ejs'}))


// 公共数据存放在 ctx.state 中  应用在中间件
app.use( async (ctx, next) => {
    ctx.state = {
        session: '这是假冒的session'
    }

    await next()
})

// 解析html文件
// app.use(views(`${__dirname}/views`, {
//     map: {
//         html: 'ejs'
//     }
// }))

router.get('/', async (ctx) => {
    let title = 'hello world'
    let title1 = 'hello world 1111'
    let arr = [
        '111',
        '222',
        '333'
    ]

    let num = 100

    // html数据

    let html = '<h2>html</h2>'

    await ctx.render('index', {
        title1,
        title,
        arr,
        html,
        num

    })
})

// 启动路由
app.use(router.routes());
// 根据 ctx.status 配置响应头
app.use(router.allowedMethods());

app.listen(3000);
