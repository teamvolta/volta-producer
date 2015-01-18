var Production = require('./prodSchema.js');
var Q = require('q');

module.exports = {
  addData: function(timeblockRequest) {
    var createRecord = Q.nbind(Production.create, Production);
    var findRecord = Q.nbind(Production.findOne, Production);
    var newRecord = {
      timeblock: timeblockRequest.timeblock,
      duration: timeblockRequest.duration,
      capacity: timeblockRequest.capacity,
      cost: timeblockRequest.cost
    };
    findRecord({
        timeblock: timeblockRequest.timeblock
      })
      .then(function(match) {
        if (match) {
          console.log("found", match);
          return;
        } else {
          console.log("not found");
          return createRecord(newRecord);
        }
      })
  },

  updateData: function(timeblockRequest) {
    var findRecord = Q.nbind(Production.findOne, Production);
    findRecord({
        timeblock: timeblockRequest.timeblock
      })
      .then(function(record) {
        if (record) {
          record.production = timeblockRequest.production;
          record.price = timeblockRequest.price;
          record.save(function(err, savedRecord) {
            if (err) {
              console.log("err when updating", err);
            } else {
              console.log("updated", savedRecord);
            }
          });
        } else {
          console.log('Timeblock to be updated not added yet');
        }
      })
      .fail(function(error) {
        console.log("error when looking for record when updating", error);
      });
  },

  getData: function(timeblockRequest, res) {
    var findRecord = Q.nbind(Production.findOne, Production);
    findRecord({
        timeblock: timeblockRequest.timeblock
      })
      .then(function(record) {
        if (record) {
          res.json(record);
        } else {
          console.log('Timeblock not added yet');
        }
      })
      .fail(function(error) {
        console.log("error when looking for record", error);
      });
  }
}