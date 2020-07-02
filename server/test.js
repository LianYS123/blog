const knex = require('./db');

const db = knex('blog');

db.count('id', {as: 'count'}).then(console.log);