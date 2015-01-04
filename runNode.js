var distman = require('distmanager');
var config = require ('./spinupConfig.js');

var test = new distman(config);
test.start();