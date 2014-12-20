var config = require('./config')[process.argv[2]];
var simulation = require('./simulation');
var socket = require('socket.io-client')(config.systemIp);

//signal when connection is established and send productionId
socket.on('connect', function(){
  console.log('producer online');
  socket.emit({id: config.productionId});
});

//receives request from system admin for supply capacity(mwh) and price($/mwh) for bidding
socket.on('requestSupply', function(){
  socket.emit('reportSupply', simulation.getSupply());
});