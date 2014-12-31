angular.module('records', []);

angular.module('records')

  .controller('recordsCtrl', function($scope, GetRecords) {
  	$scope.data = {};

    angular.extend($scope, GetRecords);
    
    $scope.getRecords()
      .then(function(data) {
      console.log("data", data);
      $scope.data = data;
    })
    .catch(function(er) {console.error(er);});

  })
  .factory('GetRecords', function ($http) {
  // Your code here
    
    var getRecords = function() {
      return $http({
        method: 'GET',
        url: 'http://localhost:8001/api/dashboard'
      })
      .then(function(res) {
        return res.data;
      });
    }

    return {
      getRecords: getRecords
    }

})
