var Event = require('./eventModel.js');
var Q = require('q');

var findEvent = Q.nbind(Event.findOne, Event);
var createEvent = Q.nbind(Event.create, Event);
var findAllEvents = Q.nbind(Event.find, Event);

module.exports = {
  allEvents: function(req, res, next) {
    console.log('allEvents called on a GET request');
    findAllEvents({})
      .then(function(events) {
        console.log('events from event controller on GET req', events);
        res.json(events);
      })
      .fail(function(error) {
        console.log('failed get req from inside controller', error);
        next(error);
      });
  },

  newEvent: function(req, res, next) {
    if(req.body === undefined) {
      console.log('ERRRRROOOOORRRR posting stuff. this is from controller');
    } else {
      var description =  req.body.description;
      var startDay = req.body.date || new Date();
      var interval = req.body.interval;

      console.log('interval from controller', req.body.interval);

      var event = createEvent({
        description: description,
        startDay: startDay,
        interval: interval
      });
      // console.log('event from inside eventController on post', event);
      res.json(event);
    }  
  }
};