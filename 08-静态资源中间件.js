const Koa = require('koa');
const router = require('koa-router')();
const views = require('koa-views');
// 使用 koa-bodyparser 中间件获取表单提交的数据
const bodyParser = require('koa-bodyparser');
// 使用静态资源中间件
const static = require('koa-static');
const app = new Koa();
// 解析ejs文件
app.use(views(`${__dirname}/views`, {extension: 'ejs'}));
// 配置 koa-bodyparser 中间件
app.use(bodyParser());
// 配置静态资源文件  可配置多个静态资源文件夹
app.use(static(__dirname + '/static'))
app.use(static(__dirname + '/public'))
router.get('/form', async (ctx) => {
    await ctx.render('public/form');
});

// 启动路由
app.use(router.routes());
// 根据 ctx.status 配置响应头
app.use(router.allowedMethods());
app.listen(3000);
