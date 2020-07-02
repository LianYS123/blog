const pathlib = require('path');
const join = (...path) => {
  return pathlib.join(...path);
};
const root = join(__dirname, '../');
const publicPath = join(root, 'dist');
console.log(root, publicPath);
console.log(join(root,'app/index.js'));