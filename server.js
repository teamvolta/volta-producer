process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config')[process.env.NODE_ENV];
var reporter = new (require('./adminReporter'))();
global.reporter = reporter;
var producer = new (require('./simulation'))(config);
var socket = require('socket.io-client')(config.systemIp);
var express = require('express');
var app = express();
// Setup reporter
// Setup middleware
app.use(express.static(__dirname + '/public'));
var server = require('http').Server(app);
// Setup server.
server.listen(config.port);

// Serve admin
app.get('/admin', function(req, res){
  res.sendFile(__dirname + '/public/admin.html');
});

// Serve stats
app.get('/api/stats', function(req, res){
  res.json(reporter.update());
});

console.log('Running the server file again');
console.log('NODE_ENV', process.env.NODE_ENV); //to check whether it's been set to production when deployed

//signal when connection is established
socket.on('connect', function(){
  console.log('producer online');
});

//receives request from system admin for supply capacity(mwh) and price($/mwh) for bidding
socket.on('requestSupply', function(){
  console.log('requestSupply');
  var supply = producer.getSupply();
  // User socketId for now
  supply.producerId = socket.io.engine.id;
  socket.emit('reportSupply', supply);
});

//receives request from system admin to set capacity based on market-clearing price
// Receive time-slot and duration from system operator
// {
//   timeslot: UTC ms,
//   duration: ms
// }
socket.on('changeProduction', function(data){
  producer.setCapacity(data);
  // Not needed right now
  // socket.emit('reportCapacity', producer.setCapacity(data));
});

