const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();
// 引入session库
const session = require('koa-session');
// cookie的签名
// 配置session 中间件
app.keys = ['some secret hurr'];
const CONFIG = {
    // 默认
    key: 'koa.sess',
    // cookie过期时间
    maxAge: 86400000,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: true,
    // 在每次请求时强行设置cookie，将重置cookie过期时间
    rolling: false,
    // 在session快过期时，重置过期时间
    renew: true,
    secure: false,
    sameSite: null,
};
app.use(session(CONFIG, app));

router.get('/', async (ctx) => {
    console.log(ctx.session.userInfo)
    ctx.body = ctx.session.userInfo
});

router.get('/login', async (ctx) => {
    ctx.session.userInfo = 'xcr'
    ctx.body = '登录成功';
});

router.get('/news', (ctx) => {
    ctx.body = ctx.session.userInfo
})




// 启动路由
app.use(router.routes());
// 根据 ctx.status 配置响应头
app.use(router.allowedMethods());
app.listen(3000);
