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
    console.log('intervalTracker before functions', intervalTracker)

    //Initialize array of individual $scope.classes for each clickable grid element
    for (var i = 0; i <= ($scope.dotCols[$scope.dotCols.length -1] + 1) * ($scope.dotRows[$scope.dotRows.length -1] + 1); i++) {
      if (defaultInterval.indexOf(i) === -1) {
        $scope.classes.push('square');
      } else {
        $scope.classes.push('selected');
      }
    }

    console.log($scope.classes);

    $scope.changeClass = function(index) {
      if ($scope.classes[index] === 'square') {
        intervalTracker.push(index);
        console.log('index', index, 'added to ', intervalTracker);
        $scope.classes[index] = 'selected';
      } else {
        var removeElem = intervalTracker.indexOf(index);
        
        intervalTracker.splice(removeElem, 1);
        console.log('index', index, 'removed from ', intervalTracker);
        $scope.classes[index] = 'square';
      }
    }

    $scope.sendData = function() {
      //Sort event intervals so can be inputted into event creator function
      console.log('interval tracker from sendData before sort', intervalTracker)

      intervalTracker = intervalTracker.sort(function(a,b) {
        return a - b;
      });

      console.log('interval tracker from sendData', intervalTracker);

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
            console.log('response from post success!', response);
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