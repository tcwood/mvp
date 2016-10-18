$(document).ready(function($) {

  //Calculate spaced interval of events
  // NOTE: Will eventually need start day, start time, and interval parameters
  window.recurrEvent = function(title) {    
    var events = [];                                        
    var daySpacing = [0, 1, 2, 4, 8, 16, 32];                  

    var curr = moment();
    for (var interval of daySpacing) {
      curr = $.extend(true, {}, curr);

      //moment's add function mutates original object
      curr = curr.add(interval, 'days');

      events.push({
        title: title,
        start: curr.format()
      });
    }
    return events; 
  }

  var events = recurrEvent('do the things');

  // events = events.concat(recurrEvent('otherStuff'));
  // events = events.concat(recurrEvent('MoarStuff', '2016-10-28T07:00:00.000Z'));

  // console.log(events);
  
  // setInterval(function(){
  //    events = events.concat(recurrEvent('other stuff'));
  // }, 1000);

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

    // $('#calendar').fullCalendar('rerenderEvents');

});