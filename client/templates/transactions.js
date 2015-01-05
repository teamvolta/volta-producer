angular.module('producerFrontEnd.transactions', [])

.controller('TransactionsController', function ($scope, getSocket) {
  angular.extend($scope, getSocket);
  $scope.socket.on('transaction', function (data) {
  	var myDate = new Date(1000*data.blockStart);
  	var newrow = '<tr><td class = blockStart>'+myDate+'</td><td class = output>'+Math.round(data.energy)+'</td><td class = setPrice>'+Math.round(data.price)+'</td></tr>';
    $('tbody').prepend(newrow);
   }) 
});