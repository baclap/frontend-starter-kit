var connect  = require('connect');
var static = require('serve-static');
var livereload = require('livereload');
var config = require('./config');

var server = connect();
server.use(static(config.DEV_PUBLIC_DIR));
server.listen(3000);
console.log('Listening on port 3000...');

var reloadServer = livereload.createServer();
reloadServer.watch(config.DEV_PUBLIC_DIR);
