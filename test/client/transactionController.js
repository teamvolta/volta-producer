var expect = require('chai').expect;
var stubs = require('../stubs');
var testConfig = stubs.testConfig;

describe('TransactionsController', function(){
  beforeEach(module('producerFrontEnd.transactions'));

  beforeEach(inject(function($controller, $rootScope){
    scope = $rootScope.$new();
    controller = $controller('DashboardController', {$scope: scope});
  }));

  //todo

});