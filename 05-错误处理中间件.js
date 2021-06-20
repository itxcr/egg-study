const Koa = require('koa');
// 引入实例化路由;
const router = require('koa-router')();
const app = new Koa();

app.use(async (ctx, next) => {
  await next();
  if (ctx.status === 404) {
    ctx.status = 404;
    ctx.body = '404 文件未找到';
  }
});


router.get('/', async (ctx) => {
  ctx.body = '首页';
});

router.get('/news', async (ctx, next) => {
  console.log(new Date());
  await next();
});

router.get('/news', async (ctx) => {
  ctx.body = '新闻页';
});

// 启动路由
app.use(router.routes());
// 根据 ctx.status 配置响应头
app.use(router.allowedMethods());

app.listen(3000);