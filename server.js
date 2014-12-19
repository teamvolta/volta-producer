var config = require('./lib/config');
var simulation = require('./lib/simulation');
var socket = require('socket.io-client')(config.systemIp);

//signal when connection is established
socket.on('connect', function(){
  console.log('producer online');
});

// receives request from system admin for supply capacity mwh and price
// system admin data sent: 
// {
//   timeSlot: UTS ms,
//   duration: ms
// }
socket.on('requestSupply', function(data){
  socket.emit('currentOutput', simulation.getPowerSupply(data));
});
