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

var recurrEvent = function(title, startDay, intervals) {    
  var events = [];                                        
  console.log('intervals from inside recurr event', intervals)
  var startMoment = moment(startDay) || moment();

  for (var interval of intervals) {

    //moment's add function mutates original object
    var nextMoment = startMoment.clone();
    nextMoment = nextMoment.add(interval, 'days');

    events.push({
      title: title,
      start: nextMoment.format()
    });
  }
  return events; 
}

//create blank calendar to start...
$(document).ready(function($) {
  createCalendar();
});