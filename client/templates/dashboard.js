angular.module('producerFrontEnd.dashboard', [])

.controller('DashboardController', function ($scope, getSocket) {
   angular.extend($scope, getSocket);
   
  $scope.ourOn('DashboardController', function (dataFromSocket) {
      $scope.dataFromSocket = dataFromSocket;
    });
  $('body').chartProduction($scope);
  $('body').chartPrice($scope);
  $('body').chartProfit($scope);
});