const Koa = require('koa');
// 引入实例化路由;
const router = require('koa-router')();
const app = new Koa();

/*
    应用级

 */

// Koa中间件
// app.use()  写一个参数，匹配所有路由 两个参数匹配具体路由
// 匹配路由之前做一些操作
app.use(async (ctx, next) => {
  console.log(new Date());
  // 当前路由匹配完成后继续向下匹配  如果不写 就不会向下匹配，所有路由都导向这里
  await next()
})

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