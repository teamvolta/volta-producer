process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('../node_modules/express/lib/express.js');
var config = require('../config')[process.env.NODE_ENV];
var app = express();

var server = require('http').Server(app);

// Setup server.
//
server.listen(config.portFront);

app.use(express.static(__dirname));

console.log("Running the front server file " + config.portFront);