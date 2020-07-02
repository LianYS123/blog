const db = require('./db')('blog');

(async () => {
    for (let i = 1; i <= 100; i++) {
      await db.insert({ title: 't' + i, content: 'c' + i, createDate: parseInt(Date.now() / 1000), author: 'a' + i }).then(console.log);
    }
})();

