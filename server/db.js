const { logDB } = require('./notice');

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'yunjikeji',
    database: 'db_lian'
  }
});

const db = (...args) => {
//   logDB(knex(...args).toSQL().sql);
  return knex(...args);
};
Object.setPrototypeOf(db, knex);
module.exports = db;
