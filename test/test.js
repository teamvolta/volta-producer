var expect = require('chai').expect;
var stubs = require('./stubs.js');

describe("test for tests", function(){ //mock test, to test gulp and deployment
  it("tests should run", function(){
    var a = 2;
    console.log("testing");  
    expect(a).to.equal(2);
  });

  it("failing tests should stop deployment", function(){  //uncomment if you want to check whether a failing test prevents deployment
    var a = 2;
    console.log("testing");  
    expect(a).to.equal(3);
  });

});