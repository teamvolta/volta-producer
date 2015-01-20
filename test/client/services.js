var expect = require('chai').expect;
var stubs = require('../stubs');
var testConfig = stubs.testConfig;

describe('factories', function(){
  beforeEach(module('producerFrontEnd.services'));

  var getSocket;
  var getCapacityCosts;

  beforeEach(inject(function(_getSocket_, _getCapacityCosts_){
    getSocket = _getSocket_;
    getCapacityCosts = _getCapacityCosts_;
  }));

  //todo
  
});