var config = require('./config')[process.argv[2]];
var producer = new (require('./simulation'))(config);
var socket = require('socket.io-client')(config.systemIp);

//signal when connection is established
socket.on('connect', function(){
  console.log('producer online');
});

//receives request from system admin for supply capacity(mwh) and price($/mwh) for bidding
socket.on('requestSupply', function(){
  console.log('requestSupply')
  var supply = producer.getSupply();
  // User socketId for now
  supply.producerId = socket.io.engine.id;
  socket.emit('reportSupply', supply);
});

//receives request from system admin to set capacity based on market-clearing price
socket.on('changeProduction', function(data){
  producer.setCapacity(data)
  // Not needed right now
  // socket.emit('reportCapacity', producer.setCapacity(data));
});

