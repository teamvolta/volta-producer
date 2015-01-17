process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config')[process.env.NODE_ENV];
var reporter = new(require('./adminReporter'))();
global.reporter = reporter;
var producer = new(require('./utils/simulation'))(config);
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var helpers = require('./db/dbHelpers.js');
// Setup reporter
// Setup middleware
app.use(express.static(__dirname + '/public'));
var server = require('http').Server(app);
// Setup server.
server.listen(config.port);
console.log('producer server listening on port ' + config.port);

var corsOptions = {
  origin: 'http://http://producfrontend.azurewebsites.net'
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Serve admin
app.get('/', function (req, res) {
  res.send('Hello World Back!')
}); //for testing purposes

app.get('/admin', function(req, res) {
  res.sendFile(__dirname + '/public/admin.html');
});

// Serve stats
app.get('/api/stats', function(req, res) {
  res.json(reporter.update());
});

// Send data to the front-end
app.get('/api/dashboard', function(req, res) {
  console.log('get request received');
});



app.post('/api/dashboard', function(req, res) {
  console.log('request post', req.body);
  if (!(typeof req.body.capacityInput === 'undefined' ||
      req.body.capacityInput === '')) {
    var newCapacity = Number(req.body.capacityInput);
    producer.maxCapacity = newCapacity;
    producer.trigger('capacChange', newCapacity);
  }
  if (!(typeof req.body.costsInput === 'undefined' ||
      req.body.costsInput === '')) {
    var newCosts = Number(req.body.costsInput);
    producer.pricePerMWH = newCosts;
    producer.trigger('costsChange', newCosts);
  }
  res.sendStatus(200);
});

console.log('Running the server file again');
console.log('NODE_ENV', process.env); //to check whether it's been set to production when deployed

var producerId;

var discoveryClient = new(require('./utils/discoverClient'))(config);
discoveryClient.discover('system', 'system', function(err, data) {
  var socket = require('socket.io-client')(JSON.parse(data.body)[0].ip + '/producers');
  //signal when connection is established
  socket.on('connect', function() {
    producerId = socket.io.engine.id;
    console.log('producer online');
  });

  discoveryClient.discover('system', 'accounting', function(err, data) {
    console.log('-------NNPROD---------', JSON.parse(data.body)[0].ip + '/subscriptions');

    ////Looking for the accounting server ip
    var accountingIP;
    var discovArray = JSON.parse(data.body);
    for (var i = 0; i < discovArray.length; i++) {
      if (discovArray[i].id && discovArray[i].id === '5') {
        accountingIP = discovArray[i].ip;
      }
    }
    ////////////////////////////
    var account = require('socket.io-client')(accountingIP + '/subscriptions');
    account.on('connect', function() {
      console.log('Producer connected to account!');
      account.emit('subscribe', {
        key: 'seller',
        subkey: producerId
      });
    });

    //receives request from system admin for supply capacity(mwh) and price($/mwh) for bidding
    socket.on('requestSupply', function(data) {
      console.log('requestSupply');
      var supply = producer.getSupply();
      // User socketId for now
      supply.producerId = producerId;
      socket.emit('reportSupply', supply);
    });

    //receives request from system admin to set capacity based on market-clearing price
    // Receive time-slot and duration from system operator
    // {
    //   timeslot: UTC ms,
    //   duration: ms
    // }
    socket.on('changeProduction', function(data) {
      console.log('received CONTROLS', data);
      for (var i = 0; i < data.length; i++) {
        if (data[i].producerId === producerId) {
          console.log('producer id found');
          producer.setCapacity(data[i].productionGoal); //setCapacity method defines the current output
          return;
        }
      }
    });

    producer.on('capacChange', function(data) {
      producer.setCapacity(data); //setCapacity method defines the current output   
    });

    /////////////////
    //Connection to the front-end
    ////////////////
    var ioServe = require('socket.io')(server);


    var clientCapCostsNsp = ioServe.of('/dashboard');
    clientCapCostsNsp.on('connection', function(socketFront) {
      console.log('a user connected');
      socketFront.emit('capacityAndCosts', {
        capacity: producer.maxCapacity,
        costs: producer.pricePerMWH
      });
      producer.on('capacChange', function() {
        socketFront.emit('capacityAndCosts', {
          capacity: producer.maxCapacity,
          costs: producer.pricePerMWH
        });
      });
      producer.on('costsChange', function() {
        socketFront.emit('capacityAndCosts', {
          capacity: producer.maxCapacity,
          costs: producer.pricePerMWH
        });
      });
    });

    var clientMarketNsp = ioServe.of('/transactionsdata');
    clientMarketNsp.on('connection', function(socketFront) {
      console.log('a user connected to the market socket');
      account.on('transaction', function(transaction) {
        console.log('TRANSACTION FOR PROD---------', transaction);
        socketFront.emit('transaction', {
          price: transaction.price,
          energy: transaction.energy,
          blockStart: transaction.block.blockStart,
          blockDuration: transaction.block.blockDuration
        });
      });
    });

  }); //end of accounting discovery
}); // end of system discovery