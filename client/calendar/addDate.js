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

//create blank calendar to start...
$(document).ready(function($) {
  createCalendar();
});