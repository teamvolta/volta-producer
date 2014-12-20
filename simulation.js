var config = require('./config')[development];

var getSupply = function(){
  var supplyPrice = {
    productionId: config.productionId,
    pricePerMWH: config.pricePerMWH,
    minCapacity: config.minCapacity,
    maxCapacity: config.maxCapacity
  }
  return supplyPrice;
};

var setCapacity = function(data){
  var cap = {
    current: config.currentOutput;
  };

  var capRequired = data.capacity;

  if (capRequired > config.maxCapacity){
    cap.current = config.maxCapacity;
  }
  if (capRequired < config.minCapacity){
    cap.current = config.minCapacity;
  }
  if (capRequired > config.minCapacity && capRequired < config.maxCapacity){
    cap.current = capRequired - config.minCapacity;
  }
  return cap;
}
