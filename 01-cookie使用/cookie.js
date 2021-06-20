const Koa = require('koa');
const render = require('koa-art-template');
const router = require('koa-router')();
const app = new Koa();
const path = require('path');
// 配置 koa-art-template 模板引擎
render(app, {
  // 模板引擎位置
  root: path.join(__dirname, '../view'),
  // 后缀名
  extname: '.html',
  // 是否开启调试模式
  debug: process.env.NODE_ENV !== 'production',
});


router.get('/', async (ctx) => {
  // let name = 'xcr'
  let name = '小超人';
  const buf = Buffer.from(name).toString('hex')
  // koa中无法设置中文的cookie
  ctx.cookies.set('username',
    // 中文不可直接用
    // name,
    buf,
    {
      maxAge: 60 * 1000 * 10,
    });

  ctx.body = '首页';
});

router.get('/news', async (ctx) => {
  let username = ctx.cookies.get('username');
  // ctx.body = new Buffer(username, 'base64').toString()

  ctx.body = Buffer.from(username, 'hex').toString()
});


// 启动路由
app.use(router.routes());
// 根据 ctx.status 配置响应头
app.use(router.allowedMethods());
app.listen(3000);
