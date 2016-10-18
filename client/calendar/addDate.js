var createCalendar = function(events) {
  $('#calendar').fullCalendar({
      // calendar properties
      editable: true,
      header: {
        left : 'prev, next today',
        center: 'title',
        right: 'month, agendaWeek, agendaDay'
      },

      events: events
    });
}

var recurrEvent = function(title, startDay) {    
  var events = [];                                        
  var daySpacing = [0, 1, 2, 4, 8, 16, 32];                  

  var startMoment = moment(startDay) || moment();
  // var curr = moment();
  for (var interval of daySpacing) {
    startMoment = $.extend(true, {}, startMoment);

    //moment's add function mutates original object
    startMoment = startMoment.add(interval, 'days');

    events.push({
      title: title,
      start: startMoment.format()
    });
  }
  return events; 
}


$(document).ready(function($) {

  //Calculate spaced interval of events
  // NOTE: Will eventually need start day, start time, and interval parameters

  var events = recurrEvent('do the things', '2016-10-28T07:00:00.000Z');
  events = events.concat(recurrEvent('these things first', '2016-10-12T07:00:00.000Z'));
  events = events.concat(recurrEvent('no date'));

  createCalendar(events);

});