const Router = require('koa-router');
const router = new Router();
const knex = require('../db');

router.post('/login', async (ctx) => {
  const { username, password } = ctx.query;
  const [{ id, user }] = await knex('user')
    .select()
    .andWhere({ username, password });

  //生成token 
  //...
  ctx.body = {
    ok: true,
    resultObject: {
      token: ''
    }
  };
});
router.post('/register', async (ctx) => {
  const { username, password } = ctx.query;
  await knex('user').insert({ username, password });

});

module.exports = router.routes();
