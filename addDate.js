$(document).ready(function() {
  // page is ready
  var recurrEvent = function(title, startDay, startTime) { //Don't use start time to begin with
    var events = [];                                        //Will need to find more about dates and moment in order to be able 
    var daySpacing = [0, 1, 2, 4, 8, 16];                  //to add a number for day and have that automagically update week/month/year as needed

    var curr = moment();
    var next;

    for (var interval of daySpacing) {
      // console.log(curr.format());

      curr = $.extend(true, {}, curr);
      curr = curr.add(interval, 'days');

      events.push({
        title: title,
        start: curr.format()
      });
    }

    return events; 
  }

  var events = recurrEvent('study');

  // console.log(events);

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