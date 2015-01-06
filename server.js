process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config')[process.env.NODE_ENV];
var reporter = new (require('./adminReporter'))();
global.reporter = reporter;
var producer = new (require('./utils/simulation'))(config);
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser  = require('body-parser');
var mongoose = require('mongoose');
var helpers = require('./db/dbHelpers.js');
// Setup reporter
// Setup middleware
app.use(express.static(__dirname + '/public'));
var server = require('http').Server(app);
// Setup server.
server.listen(config.port);

// mongoose.connect('mongodb://localhost/producerdb'); // connect to mongo database named producerdb
//should change the url

app.use(cors());
app.use(bodyParser.json());

/*//Fake data to test the db;
var timeblockRequest = {
    timeblock: 1420046277204,
    duration: 100,    
    capacity: 200,
    cost: 300
  };
helpers.addData(timeblockRequest);

var newblock = {
    timeblock: 1420046277204,
    duration: 100,
    production: 150,
    price: 320
};

helpers.updateData(newblock);
//////////////////////*/

// Serve admin
app.get('/admin', function(req, res){
  res.sendFile(__dirname + '/public/admin.html');
});

// Serve stats
app.get('/api/stats', function(req, res){
  res.json(reporter.update());
});

// Send data to the front-end
app.get('/api/dashboard', function (req, res){
  /*var timeblockRequest = {
    timeblock: 1420046277204
//    timeblock: req.body.timeblock;
  };*/
  console.log("get request received");
  // helpers.getData(timeblockRequest, res);
});

app.post('/api/dashboard', function (req, res) {
  console.log('request post', req.body);
  if (! (typeof req.body.capacityInput === 'undefined' ||
         req.body.capacityInput ==='')) {
    var newCapacity = Number(req.body.capacityInput);
    producer.maxCapacity = newCapacity;    
    producer.trigger('capacChange', newCapacity);
  }
  if (! (typeof req.body.costsInput === 'undefined' ||
         req.body.costsInput ==='')) {
    var newCosts = Number(req.body.costsInput);
    producer.pricePerMWH = newCosts;
    producer.trigger('costsChange', newCosts);     
  }
})

console.log('Running the server file again');
console.log('NODE_ENV', process.env.NODE_ENV); //to check whether it's been set to production when deployed


var discoveryClient = new (require('./utils/discoverClient'))(config);
discoveryClient.discover('system', 'system', function(err,data) {

  var socket = require('socket.io-client')(JSON.parse(data.body)[0].ip + '/producers');
  //signal when connection is established
  socket.on('connect', function(){
    console.log('producer online');
  });

  //receives request from system admin for supply capacity(mwh) and price($/mwh) for bidding
  socket.on('requestSupply', function(data){
    console.log('requestSupply');
    var supply = producer.getSupply();
    // User socketId for now
    supply.producerId = socket.io.engine.id;
    socket.emit('reportSupply', supply);
    /*var timeblockRequest = {
      timeblock: data.blockStart,
      duration: data.blockDuration,    
      capacity: supply.maxCapacity,
      cost: supply.pricePerMWH
    };
     helpers.addData(timeblockRequest);*/
  });

  //receives request from system admin to set capacity based on market-clearing price
  // Receive time-slot and duration from system operator
  // {
  //   timeslot: UTC ms,
  //   duration: ms
  // }
  socket.on('changeProduction', function(data){
    producer.setCapacity(data); //setCapacity method defines the current output
    // Not needed right now
    // socket.emit('reportCapacity', producer.setCapacity(data));
    /*var timeblockRequest = {
      timeblock: data.blockStart,
      duration: data.blockDuration,    
      production: data.production,
      price: data.pricePerMWH
    };*/
    // helpers.updateData(timeblockRequest);
  });

  producer.on('capacChange', function (data) {
    producer.setCapacity(data); //setCapacity method defines the current output
  });

});

var ioServe = require('socket.io')(server);


// ioServe.set('origins','http://localhost:*');

var clientNsp = ioServe.of('/dashboard');
clientNsp.on('connection', function(socket){
  console.log('a user connected'); 
  socket.emit('capacityAndCosts', { capacity: producer.maxCapacity, costs: producer.pricePerMWH});
  producer.on('capacChange', function() {
    socket.emit('capacityAndCosts', { capacity: producer.maxCapacity, costs: producer.pricePerMWH});
  });
  producer.on('costsChange', function() {
    socket.emit('capacityAndCosts', { capacity: producer.maxCapacity, costs: producer.pricePerMWH});
  })
});




/*module.exports.server = server;
module.exports.producer = producer;*/
