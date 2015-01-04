
/*process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('../../config')[process.env.NODE_ENV];  */
var socket = require('socket.io-client')('http://localhost:8010/subscriptions');
socket.on('transaction', function (data) {
  console.log(data);
});