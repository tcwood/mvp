angular.module('eventAdder', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/eventAdder/form.html',
        controller: 'eventAdderCntrl'
      })
      .otherwise({
        redirectTo: '/'
      })
  })
  .controller('eventAdderCntrl', function($scope, $location, $http){
    $scope.warning = '';

    $scope.dotCols = [0, 1, 2, 3, 4, 5, 6];
    $scope.dotRows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    var defaultInterval = [0, 1, 3, 7, 15, 31, 63];

    $scope.classes = [];
    var intervalTracker = defaultInterval.slice();

    //Initialize array of individual $scope.classes for each clickable grid element
    for (var i = 0; i <= ($scope.dotCols[$scope.dotCols.length -1] + 1) * ($scope.dotRows[$scope.dotRows.length -1] + 1); i++) {
      if (defaultInterval.indexOf(i) === -1) {
        $scope.classes.push('square');
      } else {
        $scope.classes.push('selected');
      }
    }

    $scope.changeClass = function(index) {
      if ($scope.classes[index] === 'square') {
        intervalTracker.push(index);
        $scope.classes[index] = 'selected';
      } else {
        var removeElem = intervalTracker.indexOf(index);
        intervalTracker.splice(removeElem, 1);
        $scope.classes[index] = 'square';
      }
    }

    $scope.sendData = function() {
      //Sort event intervals so can be inputted into event creator function
      intervalTracker = intervalTracker.sort(function(a,b) {
        return a - b;
      });

      //Invalid form data
      if ($scope.description === undefined || $scope.description === '') {
        $scope.warning = 'Please enter a description!';
      //Send POST request
      } else {

        var data = JSON.stringify({
          description: $scope.description,
          date: $scope.date,
          interval: intervalTracker
        });
        $http({
          method: 'POST',
          data: data,
          url: './addData'
        }).success(function(response) {
            //Send GET request after successful POST
            $http.get('./getEvents')
              .success(function(res) {
                $('#calendar').fullCalendar('removeEvents');

                var allEvents = [];

                res.forEach(function(startEvent) {
                  var interval = startEvent.interval.split(',');
                  var description = startEvent.description;
                  var startDate = startEvent.startDay;
                  allEvents = allEvents.concat(recurrEvent(description, startDate, interval));
                })

                //refresh calendar to have updated events
                $('#calendar').fullCalendar('addEventSource', allEvents);
              })
              .error(function(res) {
                console.log('GET right after post = failz', res);
              });
          })
          .error(function(response) {
            console.log('error on POST:', response);
          });
      }
    };
  });