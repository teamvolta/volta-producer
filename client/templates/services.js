angular.module('producerFrontEnd.services', [])

.factory('getSocket', function () {
  var socket = io('http://localhost:8010/subscriptions');
  return {
      socket: socket
    }
})
.factory('sendControls', function ($http) {
  
})