exports.development = {
  backend: 'http://localhost:8001',
  portFront: 3000
};

exports.production = {
  backend: 'http://productest.azurewebsites.net',
  portFront: process.env.PORT
};