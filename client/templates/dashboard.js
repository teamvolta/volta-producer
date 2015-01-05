angular.module('producerFrontEnd.dashboard', [])

.controller('DashboardController', function ($scope, getSocket) {
  angular.extend($scope, getSocket);
  $('body').chartProduction($scope.socket);
  $('body').chartPrice($scope.socket);
  $('body').chartProfit($scope.socket);
});