var express = require('express');
var app = express();

var server = require('http').Server(app);


// Setup server.
server.listen(3000);

app.use(express.static(__dirname));

console.log("Running the front server file");