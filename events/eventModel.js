var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
  description: String,
  startDay: String            //maybe have this embedded as string to get time into it as well...
  // startTime: ,
  // interval: Array
  // user:  
});

module.exports = mongoose.model('Event', EventSchema);
