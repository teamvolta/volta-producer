var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);


// Setup server.
server.listen(8010);

console.log("Running the test server file");

var subscriberNsp = io.of('/subscriptions');
var data;

setInterval(function() {
  data = {
	price: 100*Math.random(), 
	producerId: "rand", 
	energy: 200*Math.random(),
	blockStart: 10*Math.random(),
	blockDuration: 2,
	transactionId: "random"
 };
 data.capacity = data.price*Math.random();
}, 3000);


subscriberNsp.on('connection', function(socket){
  console.log('connected', socket);
  setInterval(function() {
    socket.emit('transaction', data)  	
  }, 2000)
});