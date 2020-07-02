const Koa = require('koa');
const { logError } = require('./notice');
const app = new Koa();

app.use(async (ctx, next) => {
  // ctx.set('Access-Control-Allow-Origin', '*');
  // ctx.set('Access-Control-Allow-Headers', '*');
  // ctx.set('Access-Control-Allow-Methods', '*');
  // ctx.set('Access-Control-Allow-Credentials', '*');
  try {
    await next();
  } catch (error) {
    logError(error.message)
    ctx.body = {
      ok: false,
      message: 'internal server error'
    };
  }
});

app.use(require('./router'));

app.listen(12345);
