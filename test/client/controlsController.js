var expect = require('chai').expect;
var stubs = require('../stubs');
var testConfig = stubs.testConfig;

describe('ControlsController', function(){
  beforeEach(module('producerFrontEnd.controls'));

  beforeEach(inject(function($controller, $rootScope){
    scope = $rootScope.$new();
    controller = $controller('ControlsController', {$scope: scope});
  }));

  it('should set $scope.capacity to the configuration file', function(){
    //todo
  });

  it('should set $scope.costs to the configuration file', function(){
    //todo
  });

  it('$scope.sendControls should run', function(){
    //todo 
  });
});