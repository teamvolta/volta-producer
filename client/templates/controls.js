angular.module('producerFrontEnd.controls', [])

.controller('ControlsController', function ($scope, sendControls, getCapacityCosts) {
  angular.extend($scope, sendControls);
  angular.extend($scope, getCapacityCosts);
  $scope.capCostsOn('ControlsController', function (data) {
  	 $scope.$apply(function () {
  	   $scope.capacity = data.capacity;
       $scope.costs = data.costs;
     });
  });
});