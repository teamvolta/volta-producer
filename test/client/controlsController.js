var expect = require('chai').expect;
var stubs = require('../stubs');
var testConfig = stubs.testConfig;

describe('ControlsController', function(){
  beforeEach(module('producerFrontEnd.controls'));

  beforeEach(inject(function($controller, $rootScope){
    scope = $rootScope.$new();
    controller = $controller('ControlsController', {$scope: scope})
    $controller = _$controller_;
  }));

  describe('')
});