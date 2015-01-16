angular.module('producerFrontEnd', [
  'producerFrontEnd.controls',
  'producerFrontEnd.dashboard',
  'producerFrontEnd.transactions',
  'producerFrontEnd.services',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/dashboard.html',
      controller: 'DashboardController'
    })
    .when('/transactions', {
      templateUrl: 'app/transactions.html',
      controller: 'TransactionsController'
    })
    .when('/controls', {
      templateUrl: 'app/controls.html',
      controller: 'ControlsController'
    })
    .otherwise({
      redirectTo: '/'
    });
})
.run(function(getSocket, getCapacityCosts) {})
