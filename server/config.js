const pathlib = require('path');
const resolve = (...path) => pathlib.join(__dirname, ...path);
module.exports = {
    ERROR_LOG_PATH: resolve('log', 'error.log'),
    DB_LOG_PATH: resolve('log', 'db.log')
}