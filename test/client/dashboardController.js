var expect = require('chai').expect;
var stubs = require('../stubs');
var testConfig = stubs.testConfig;

describe('DashboardController', function(){
  beforeEach(module('producerFrontEnd.dashboard'));

  beforeEach(inject(function($controller, $rootScope){
    scope = $rootScope.$new();
    controller = $controller('DashboardController', {$scope: scope});
  }));

  //todo

});