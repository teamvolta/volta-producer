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
      templateUrl: 'templates/dashboard.html',
      controller: 'DashboardController'
    })
    .when('/transactions', {
      templateUrl: 'templates/transactions.html',
      controller: 'TransactionsController'
    })
    .when('/controls', {
      templateUrl: 'templates/controls.html',
      controller: 'ControlsController'
    })
    .otherwise({
      redirectTo: '/'
    });
})
.run(function(getSocket, getCapacityCosts) {})
