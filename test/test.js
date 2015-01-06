var expect = require('chai').expect;
var stubs = require('./stubs.js');
var testConfig = stubs.testConfig;
// var socket = require('socket.io-client')(testConfig.systemIP);
var Producer = require('../utils/simulation');

describe('test for tests', function(){ //mock test, to test gulp and deployment
  it('tests should run', function(){
    var a = 2;
    console.log('testing');  
    expect(a).to.equal(2);
  });

  it.skip('failing tests should stop deployment', function(){
    var a = 2;
    console.log('testing');  
    expect(a).to.equal(3);
  });
});

describe('Producer class setup', function(){
  before('create Producer', function(){
    producer = new Producer(testConfig);
  });
  describe('config', function(){
    it('producer should have own properties', function(){
      expect(producer).to.have.property('pricePerMWH');
      expect(producer).to.have.property('minCapacity');
      expect(producer).to.have.property('maxCapacity');
      expect(producer).to.have.property('currCapacity');
    });
    it('own properties should equal config settings', function(){
      expect(producer.pricePerMWH).to.equal(testConfig.pricePerMWH);
      expect(producer.minCapacity).to.equal(testConfig.minCapacity);
      expect(producer.maxCapacity).to.equal(testConfig.maxCapacity);
      expect(producer.currCapacity).to.equal(testConfig.currCapacity);
    });
  });
  describe('event listener methods', function(){
    var supply
    var capacity;
    beforeEach('run listener methods', function(){
      supply = producer.getSupply();
      capacity = producer.setCapacity(
        {
          capacity: 25//for testing purposes
        }
      );
    });
    describe('getSupply()', function(){
      it('should have "getSupply" method', function(){
        expect(producer).to.respondTo('getSupply');
      });
      it('should return an object with config properites', function(){
        expect(supply).to.be.an('object');
        expect(supply).to.have.property('pricePerMWH');
        expect(supply).to.have.property('minCapacity');
        expect(supply).to.have.property('maxCapacity');
        expect(supply).to.have.property('currCapacity');
      });
      it('should equal config settings', function(){
        expect(supply.pricePerMWH).to.equal(testConfig.pricePerMWH);
        expect(supply.minCapacity).to.equal(testConfig.minCapacity);
        expect(supply.maxCapacity).to.equal(testConfig.maxCapacity);
      });
      it('current capacity should be between min and max capacities', function(){
        expect(supply.currCapacity).to.be.above(testConfig.minCapacity);
        expect(supply.currCapacity).to.be.below(testConfig.maxCapacity);
      });
    });
    describe('setCapacity()', function(){
      it('should have "setCapacity" method', function(){
        expect(producer).to.respondTo('setCapacity');
      });
      it('should return an object with "current" property', function(){
        expect(capacity).to.be.an('object');
        expect(capacity).to.have.property('current');
      });
      it('current value should be between min and max capacities', function(){
        expect(capacity.current).to.be.above(testConfig.minCapacity);
        expect(capacity.current).to.be.below(testConfig.maxCapacity);
      });
    });
  });
});