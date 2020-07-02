const { DB_LOG_PATH, ERROR_LOG_PATH } = require('./config');
const fs = require('fs');


module.exports = {
    logError: (msg) => fs.appendFile(ERROR_LOG_PATH, msg + '\n', (err) => err && console.log(err)),
    logDB: (msg) => fs.appendFile(DB_LOG_PATH, msg + '\n', (err) => err && console.log(err))
}
