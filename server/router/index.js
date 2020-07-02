const Router = require('koa-router');
const router = new Router({ prefix: '/api' });


router.use('/blog', require('./blog'));

router.use('/user', require('./user'));


module.exports = router.routes();
