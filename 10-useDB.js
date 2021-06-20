const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();
const DB = require('./03-mongodb/module/db');
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');

app.use(views(`${__dirname}/views`, {extension: 'ejs'}));
app.use(bodyParser())

router.get('/', async (ctx) => {
    let info = await DB.find('user');
    await ctx.render('public/index', {
        info: JSON.stringify(info)
    });
});

router.get('/add', async (ctx) => {
    await ctx.render('public/form');
});
router.post('/doAdd', async (ctx) => {
    // 获取表单提交的数据  ctx.request.body
    let form = ctx.request.body;
    await DB.insert('user', form);
    ctx.status = 301;
    ctx.redirect('/')
});


router.get('/edit', async (ctx) => {
    await ctx.render('public/edit');
});
router.post('/doEdit', async (ctx) => {
    // 获取表单提交的数据  ctx.request.body
    let form = ctx.request.body;
    let res = await DB.update('user', {username: form.username}, form);
    ctx.body = res.result;
});


router.get('/del', async (ctx) => {
    await ctx.render('public/del');
});
router.post('/doDel', async (ctx) => {
    // 获取表单提交的数据  ctx.request.body
    let form = ctx.request.body;
    let res = await DB.delete('user', {username: form.username});
    ctx.body = res.result;
});
// 启动路由
app.use(router.routes());
// 根据 ctx.status 配置响应头
app.use(router.allowedMethods());
app.listen(3000);
