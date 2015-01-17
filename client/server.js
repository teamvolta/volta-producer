process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config')[process.env.NODE_ENV];
var express = require('express');
var app = express();

var server = require('http').Server(app);

// Setup server.
//
server.listen(config.portFront);

app.get('/', function (req, res) {
  res.send('Hello World Front!')
});


app.use(express.static(__dirname));

console.log("Running the front server file " + config.portFront);