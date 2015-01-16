angular.module('producerFrontEnd.services', [])

.factory('getSocket', function (getCapacityCosts) {
  var socket = io('http://localhost:8001/transactionsdata');
  var dataFromSocket = []; //it will behave as a queue
  var targetLength = 10;
  var lastDataPoint = {
                       capacity: 0,
                       costs: 0,
                       price: 0,
                       energy: 0,
                       blockStart: 0,
                       blockDuration: 0
                      };

  for (var i = 0; i<targetLength; i++) {  //create the initial array of length 10 with the right structure
  	var newestPoint = {};
    _.extend(newestPoint, lastDataPoint);
    dataFromSocket.push(newestPoint);
  };

  var updateData = function (dataArray, newPoint, arLength) {  //helper function to make dataFromSocket behave like a queue
    var newerPoint = {};
    _.extend(newerPoint, newPoint);
    dataArray.push(newerPoint);
    if (dataArray.length > arLength) {
      dataArray.shift();
    }
  }

  var listeners = {};

  getCapacityCosts.capCostsOn('getSocketFactoryId', function (data) {
    lastDataPoint.capacity = data.capacity;
    lastDataPoint.costs = data.costs;
    lastDataPoint.energy = Math.min(lastDataPoint.energy, data.capacity);
    updateData(dataFromSocket, lastDataPoint, targetLength);
    console.log("dataFromSocket", dataFromSocket);
    for (var key in listeners) {
      listeners[key](dataFromSocket); 
    };   
  })

  socket.on('transaction', function (data) {
    lastDataPoint.energy = data.energy;
    lastDataPoint.price = data.price;
    lastDataPoint.blockStart = data.blockStart;
    lastDataPoint.blockDuration = data.blockDuration;
    updateData(dataFromSocket, lastDataPoint, targetLength);
    console.log('dataFromSocket2', dataFromSocket);
    for (var key in listeners) {
      listeners[key](dataFromSocket); 
    };
  });

  return {
      ourOn: function(id, callback) {
        listeners[id] = callback;
      },
      dataFromSocket: dataFromSocket,
      targetLength: targetLength
    }
})
.factory('getCapacityCosts', function () {
  var socket = io('http://localhost:8001/dashboard');
  var plantState = {};
  var listeners = {};
  socket.on('capacityAndCosts', function (data) {
    console.log("capData", data);
    plantState.costs = data.costs;
    plantState.capacity = data.capacity;
    for (var key in listeners) {
      listeners[key](data); 
    };
  });

  return {
      capCostsOn: function(id, callback) {
        listeners[id] = callback;
      },
      plantState: plantState
    }
})
.factory('sendControls', function ($http) {
  var sendControls = function(capacityInput, costsInput) {
      console.log("input", capacityInput, costsInput);  
      return $http.post('http://localhost:8001/api/dashboard',
        {'capacityInput': capacityInput, 'costsInput': costsInput});
  };
  return {
    sendControls: sendControls
  }
})
