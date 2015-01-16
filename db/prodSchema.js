var mongoose = require('mongoose');

var prodSchema = new mongoose.Schema({
  timeblock: Date,
  duration: Number,
  capacity: Number,
  production: Number,
  price: Number,
  cost: Number
});

module.exports = mongoose.model('Production', prodSchema);