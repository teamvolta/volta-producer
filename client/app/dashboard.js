angular.module('producerFrontEnd.dashboard', [])

.controller('DashboardController', function ($scope, getSocket) {
  angular.extend($scope, getSocket);
   
  $('body').chartProduction($scope);
  $('body').chartPrice($scope);
  $('body').chartProfit($scope);
});