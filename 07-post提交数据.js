const Koa = require('koa');
const router = require('koa-router')();
const views = require('koa-views');
// 使用 koa-bodyparser 中间件获取表单提交的数据
const bodyParser = require('koa-bodyparser');
const app = new Koa();

// 解析ejs文件
app.use(views(`${__dirname}/views`, {extension: 'ejs'}));
// 配置 koa-bodyparser 中间件
app.use(bodyParser())

router.get('/', async (ctx) => {
    ctx.body = '首页';
});

router.get('/form', async (ctx) => {
    await ctx.render('public/form');
});

// 接收post提交的数据
router.post('/doAdd', async (ctx) => {
    // 获取表单提交的数据  ctx.request.body
    let form = ctx.request.body;
    console.log(form)
    ctx.body= '登录成功'

});

// 启动路由
app.use(router.routes());
// 根据 ctx.status 配置响应头
app.use(router.allowedMethods());
app.listen(3000);
