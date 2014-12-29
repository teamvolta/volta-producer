var adminReporter = function(){
  this.dataExport = [];
  this.dataStore = {};
};

// Registers a value to watch. Pass in watcher callback that when called, returns the value to store
adminReporter.prototype.register = function(key, watcher) {
  if(!this.dataStore[key]){
    this.dataStore[key] = {data:{}};
    this.dataExport.push(this.dataStore[key].data);
  }
  this.dataStore[key].watcher = watcher;
  this.dataStore[key].data.name = key;
  this.dataStore[key].data.value = watcher();
};

// Updates all values and returns array of updated key value pairs.
adminReporter.prototype.update = function() {
  for(var key in this.dataStore){
    if(this.dataStore.hasOwnProperty(key)){
      this.dataStore[key].data.value = this.dataStore[key].watcher();
    }
  }
  return this.dataExport;
};

// Allows manual reporting of new levels
adminReporter.prototype.report = function(key, getter) {
  this.register(key, getter);
};

module.exports = adminReporter;
