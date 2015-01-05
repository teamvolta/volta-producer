angular.module('producerFrontEnd.services', [])

.factory('getSocket', function () {
  var socket = io('http://localhost:8010/subscriptions');
  console.log("fact");
  return {
      socket: socket
    }
})
.factory('sendControls', function ($http) {
  
})