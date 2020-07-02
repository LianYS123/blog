const db = require('./db')('blog');

db.delete().then(console.log);