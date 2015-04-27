/**
 * Created by kyle on 4/25/15.
 */

(function () {
    var app = angular.module('timeclock');
    //in line event listener to handle the login
    app.controller('EventsController', function ($rootScope, $scope, $location, $cookies, $interval) {
        $scope.$watch('$viewContentLoaded', function () {
            console.log("Firing the on view loaded method in the events controller");

            //TODO check for this
            //if($cookies.employeeId)

            getEventsTest();
        });

        var getEventsTest = function() {
            var Employee = Parse.Object.extend("Employee");
            var employee = new Employee();
            employee.id = $cookies.employeeId;

            var Event = Parse.Object.extend("Event");
            var query = new Parse.Query(Event);


            query.equalTo("created_by", employee);
            query.limit(50);
            query.descending("createdAt");
            query.find({
                success: function (object) {
                    console.log("The events query");
                    console.dir(object);
                    if (typeof object === "undefined") {
                        console.log("Query returned undefined object");
                    } else if (object.length === 0) {
                        console.log("Query returned no events");
                        $scope.events = [];
                        console.dir($scope.events);
                    } else {
                        $scope.employeeName = $cookies.employeeName;
                        $scope.events = object;

                        if(object[0].get("time_out") === null){
                            $scope.eventType = "Time In";
                            $scope.btnText = "Clock Out";
                            $scope.lastEvent = object[0].get("time_in");
                        } else {
                            $scope.eventType = "Time Out";
                            $scope.btnText = "Clock In";
                            $scope.lastEvent = object[0].get("time_out");
                        }
                        console.dir(object);
                    }
                },
                error: function (error) {
                    console.log("Error: " + error.code + " " + error.message);
                }
            });
        };

        $scope.btnText = "Clock In";
        $scope.employeeStatus = "Unknown";

        $scope.clockEvent = function() {
            if (typeof $cookies.employeeId === "undefined"){
                $location.path('/login');
                alert("Please sign in");
            } else {
                console.log("Event button clicked");

                var Employee = Parse.Object.extend("Employee");
                var employee = new Employee();

                var userQuery = new Parse.Query(Employee);
                userQuery.equalTo("objectId", $cookies.employeeId);
                userQuery.first({
                    success: function (object) {
                        employee = object;
                        console.log("this is the employee object saving the event");
                        console.dir(employee);
                    },
                    error: function (error) {
                        console.log("Error: " + error.code + " " + error.message);
                    }
                });

                saveEvent(employee);
                toggleText();
                getEventsTest();
            }
        };

        var toggleText = function() {
            if ($scope.btnText === "Clock In"){
                $scope.btnText = "Clock Out"
            } else {
                $scope.btnText = "Clock In";
            }
        };

        var saveEvent = function(employee) {
            employee.id = $cookies.employeeId;

            var Event = Parse.Object.extend("Event");
            var eventQuery = new Parse.Query(Event);
            eventQuery.equalTo("time_out", null);
            eventQuery.equalTo("created_by", employee);
            eventQuery.descending("createdAt");
            eventQuery.first({
                success: function(object){
                    if(typeof object === "undefined") {
                        console.log("Query returned undefined event, need to clock in");
                        newEvent(employee);
                    } else {
                        updateEvent(object);
                        console.dir(object);
                    }
                },
                error: function(error){
                    console.log("Error: " + error.code + " " + error.message);
                }
            });
        };

        var newEvent = function(employee) {
            console.log("saving new event");
            var TimeEvent = Parse.Object.extend("Event");
            var newEvent = new TimeEvent();

            employee.id = $cookies.employeeId;

            newEvent.set("created_by", employee);
            newEvent.set("time_in", Date.now());
            newEvent.set("time_out", null);

            console.dir(employee);
            console.dir(newEvent);

            newEvent.save();
        };

        var updateEvent = function(event) {
            console.log("updating an old event");
            event.set("time_out", Date.now());
            event.save();
        };

        $scope.getEvents = function() {
            var Employee = Parse.Object.extend("Employee");
            var employee = new Employee();
            employee.id = $cookies.employeeId;

            var Event = Parse.Object.extend("Event");
            var query = new Parse.Query(Event);


            query.equalTo("created_by", employee);
            query.limit(50);
            query.descending("createdAt");
            query.find({
                success: function(object){
                    if(typeof object === "undefined") {
                        console.log("Query returned undefined object");
                    } else {
                        $scope.employeeName = $cookies.employeeName;
                        $scope.events = object;
                        console.dir(object);
                    }
                },
                error: function(error){
                    console.log("Error: " + error.code + " " + error.message);
                }
            });
        };

        $scope.AssignedDate = Date;

        //set the interval to one second and update the time
        $interval(function(){
        }, 1000);

        $scope.timeZone = new Date().toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1];
    });
})();
