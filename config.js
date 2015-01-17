exports.development = {
  port: 8001,
  systemIp: 'http://localhost:8000/producers',
  productionId: Math.random().toString(36).substr(2),
  pricePerMWH: 70,
  minCapacity: 0,
  maxCapacity: 100,
  currCapacity: 100,
  discoveryIp: 'http://104.40.181.157:8001',
  ip: 'http://localhost:8001',
  id: Math.floor(Math.random() * 100000),
  role: 'producer',
  subRole: 'producer',
  portFront: 3000
};

exports.production = {
  port: process.env.APPSETTING_PRODUCER_PORT,
  systemIp: 'http://gridsystemtest.azurewebsites.net/producers', //to replace later
  productionId: Math.random().toString(36).substr(2),
  pricePerMWH: 70,
  minCapacity: 0,
  maxCapacity: 100,
  currCapacity: 100,
  discoveryIp: 'http://104.40.181.157:8001',
  ip: 'http://productest.azurewebsites.net/producers',
  id: Math.floor(Math.random() * 100000),
  role: 'producer',
  subRole: 'producer',
  portFront: process.env.APPSETTING_PRODUCER_FRONT_PORT
};