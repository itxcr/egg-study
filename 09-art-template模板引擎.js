const Koa = require('koa');
const render = require('koa-art-template');
const router = require('koa-router')();
const app = new Koa();
const path = require('path');
// 配置 koa-art-template 模板引擎
render(app, {
  // 模板引擎位置
  root: path.join(__dirname, 'view'),
  // 后缀名
  extname: '.html',
  // 是否开启调试模式
  debug: process.env.NODE_ENV !== 'production',
});


router.get('/', async (ctx) => {
  let list = [
    {
      name: '张三',
    },
  ];

  let num = 20;
  await ctx.render('index',
    {
      list,
      num
    },
  );
});


// 启动路由
app.use(router.routes());
// 根据 ctx.status 配置响应头
app.use(router.allowedMethods());
app.listen(3000);
