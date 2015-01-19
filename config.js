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
  port: process.env.PORT,
  systemIp: 'http://gridsystemtest.azurewebsites.net/producers', //to replace later
  productionId: Math.random().toString(36).substr(2),
  pricePerMWH: Number(process.env.pricePerMWH),
  minCapacity: Number(process.env.minCapacity),
  maxCapacity: Number(process.env.maxCapacity),
  currCapacity: Number(process.env.currCapacity),
  discoveryIp: 'http://104.40.181.157:8001',
  ip: process.env.thisIP,
  id: Math.floor(Math.random() * 100000),
  role: 'producer',
  subRole: 'producer',
  portFront: process.env.PRODUCER_FRONT_PORT
};