var config = require('./config')[process.argv[2]];
var simulation = require('./simulation');
var socket = require('socket.io-client')(config.systemIp);

//signal when connection is established and send productionId
socket.on('connect', function(){
  console.log('producer online');
  // This is called with no event, also, currently using socket.id for id anyways
  // socket.emit({id: config.productionId});
  // Report supply in intervals
  setInterval(function(){
    var supply = simulation.getSupply();
    // User socketId for now
    supply.producerId = socket.io.engine.id;
    socket.emit('reportSupply', supply);
  }, 500)
});

//receives request from system admin for supply capacity(mwh) and price($/mwh) for bidding
socket.on('requestSupply', function(){
  socket.emit('reportSupply', simulation.getSupply());
});

//receives request from system admin to set capacity based on market-clearing price
socket.on('changeProduction', function(data){
  simulation.setCapacity(data)
  // Not needed right now
  // socket.emit('reportSupply', simulation.setCapacity(data));
});

