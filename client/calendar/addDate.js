$(document).ready(function($) {
  // page is ready
  var recurrEvent = function(title, startDay, startTime) { 
    var events = [];                                        
    var daySpacing = [0, 1, 2, 4, 8, 16, 32];                  

    var curr = moment();
    for (var interval of daySpacing) {
      curr = $.extend(true, {}, curr);
      curr = curr.add(interval, 'days');          //moment's add function mutates original object

      //Push new event based on set interval of days
      events.push({
        title: title,
        start: curr.format()
      });
    }
    return events; 
  }

  var events = recurrEvent('do the things');

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
});