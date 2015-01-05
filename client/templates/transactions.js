angular.module('producerFrontEnd.transactions', [])

.controller('TransactionsController', function ($scope, getSocket) {
  angular.extend($scope, getSocket);
  $scope.socket.on('transaction', function (data) {
    $('#transactionsView').text(data.price);
   }) 
});