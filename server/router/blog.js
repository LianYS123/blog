const Router = require('koa-router');
const router = new Router();
const knex = require('../db');


//列表
router.get('/', async (ctx) => {
    const { page, pageSize } = ctx.query;
    console.log('someone visit blog');
    const pageElements = await knex
      .select()
      .from('blog')
      .limit(parseInt(pageSize))
      .offset((parseInt(page) - 1) * parseInt(pageSize));
    const { total } = (await knex('blog').count('id', { as: 'total' }))[0];
    ctx.body = {
      ok: true,
      resultObject: {
        pageElements,
        total
      }
    };
  });
  //查
  router.get('/:id', async (ctx) => {
    const { id } = ctx.params;
    const resultObject = await knex.select().from('blog').where({ id });
    ctx.body = {
      ok: true,
      resultObject
    };
  });
  //增
  router.post('/', async (ctx) => {
    const { title, content } = ctx.query;
    await knex('blog').insert({ title, content });
    ctx.body = {
      ok: true
    };
  });
  //改
  router.put('/:id', async (ctx) => {
    const { id } = ctx.params;
    const { title, content } = ctx.query;
    await knex('blog').update({ title, content }).where({ id });
    ctx.body = {
      ok: true
    };
  });
  //删
  router.del('/:id', async (ctx) => {
    const { id } = ctx.params;
    await knex('blog')
      .where({ id: parseInt(id) })
      .delete();
    ctx.body = {
      ok: true
    };
  });
  
  module.exports = router.routes();