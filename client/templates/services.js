angular.module('producerFrontEnd.services', [])

.factory('getSocket', function () {
  var socket = io('http://localhost:8010/subscriptions');
  var dataFromSocket = []; //it will behave as a queue
  var targetLength = 10;
  for (var i = 0; i<targetLength; i++) {
  	dataFromSocket.push({price: 0,
	                     capacity: 0,
	                     blockStart: i+1,
                         energy: 0,
                         costs: 0})
  };
  var listeners = {};
  socket.on('transaction', function (data) {
    dataFromSocket.push(data);
    if (dataFromSocket.length > targetLength) {
      dataFromSocket.shift();
    }
    for (var key in listeners) {
      listeners[key](dataFromSocket); 
    };
    // console.log("service", dataFromSocket);
  });

  return {
      ourOn: function(id, callback) {
        listeners[id] = callback;
      },
      dataFromSocket: dataFromSocket,
      targetLength: targetLength
    }
})
.factory('sendControls', function ($http) {
  var sendControls = function(capacityInput, costsInput) {
      console.log("input", capacityInput, costsInput);
      
      return $http.post('http://localhost:8001/api/dashboard',
        {'capacityInput': capacityInput, 'costsInput': costsInput})
    };
  return {
    sendControls: sendControls
  }
})