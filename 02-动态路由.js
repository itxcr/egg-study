const Koa = require('koa');
// 引入实例化路由;
const router = require('koa-router')();
const app = new Koa();


// 动态路由
router.get('/news/:id', async (ctx) => {
  // 获取动态路由传值
  console.log(ctx.params);

  ctx.body = ctx.params.id;
});

// 动态路由可传入多个值
router.get('/user/:username/:pass', async (ctx) => {
  // 获取动态路由传值
  console.log(ctx.params);

  ctx.body = ctx.params;
});

// 启动路由
app.use(router.routes());
// 根据 ctx.status 配置响应头
app.use(router.allowedMethods());

app.listen(3000);