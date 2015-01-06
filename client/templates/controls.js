angular.module('producerFrontEnd.controls', [])

.controller('ControlsController', function ($scope, sendControls) {
  angular.extend($scope, sendControls); 
  
});