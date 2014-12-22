var Producer = function(config){
  this.pricePerMWH: config.pricePerMWH,
  this.minCapacity: config.minCapacity,
  this.maxCapacity: config.maxCapacity,
  this.currCapacity: config.currCapacity
};

Producer.prototype.getSupply = function(){
  return {
    pricePerMWH: this.pricePerMWH,
    minCapacity: this.minCapacity,
    maxCapacity: this.maxCapacity
  };
};

Producer.prototype.setCapacity = function(data){
  var cap = {
    current: this.currCapacity;
  };

  var capRequired = data.capacity;

  if (capRequired > this.maxCapacity){
    cap.current = this.maxCapacity;
  }
  if (capRequired < this.minCapacity){
    cap.current = this.minCapacity;
  }
  if (capRequired > this.minCapacity && capRequired < this.maxCapacity){
    cap.current = capRequired - this.minCapacity;
  }
  return cap;
};

module.exports = Producer;
