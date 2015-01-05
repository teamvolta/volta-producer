angular.module('producerFrontEnd.dashboard', [])

.controller('DashboardController', function ($scope, getSocket) {
   angular.extend($scope, getSocket);
   /*$scope.$watch('dataFromSocket', function (newVal, oldVal) {
      console.log("noticed change", newVal, oldVal);
    });*/
  $scope.$on('newInfo', function (event, dataFromSocket) {
      // console.log('newState', dataFromSocket);
      $scope.dataFromSocket = dataFromSocket;
      // $scope.emit('newDataForChart', dataFromSocket);
    });
  $('body').chartProduction($scope);
  //$('body').chartPrice($scope.socket);
  //$('body').chartProfit($scope.socket);
});