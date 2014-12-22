exports.development = {
  port: 8001,
  systemIp: 'http://localhost:8000/producers',
  productionId: Math.random().toString(36).substr(2),
  pricePerMWH: 9001,
  minCapacity: 0,
  maxCapacity: 100,
  currentOutput: 100
};

exports.production = {

};
