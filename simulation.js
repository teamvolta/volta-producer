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

