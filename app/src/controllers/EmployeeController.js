/**
 * Created by kyle on 4/25/15.
 */

(function () {
    var app = angular.module('timeclock');

    app.controller('EmployeeController', function ($scope, $http, $rootScope, $cookies, $location) {
        $scope.$watch('$viewContentLoaded', function () {
            $scope.employeeName = $cookies.employeeName;

            if (typeof $cookies.employeeId === "undefined") {
                console.log("no employeeId cookie yet");
                $location.path('/login');
            } else {
                getEmployeeFromCookie();
            }
        });

        $scope.$on('event:google-plus-signin-success', function (event, authResult) {
            if (typeof $cookies.employeeId === "undefined") {
                console.log("auth event fired, making the request to the endpoint");
                console.log("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" + authResult.access_token);
                var $endpoint = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" + authResult.access_token;
                getGooleAccountInfo($endpoint);
                console.log("made http request to get user info");
            } else {
                console.log("auth event fired, getting the user from the cookie");
                getEmployeeFromCookie();
            }

        });

        var getEmployeeFromCookie = function() {
            var Employee = Parse.Object.extend("Employee");
            var employee = new Employee();

            var userQuery = new Parse.Query(Employee);
            userQuery.equalTo("objectId", $cookies.employeeId);
            userQuery.first({
                success: function (object) {
                    employee = object;
                    console.log("this is the employee saved in the cookie");
                    console.dir(employee);
                },
                error: function (error) {
                    console.log("Error: " + error.code + " " + error.message);
                }
            });
        };

        var getGooleAccountInfo = function ($endpoint) {
            $http.get($endpoint).
                success(function (data, status, headers, config) {
                    console.log(data);
                    getEmployeeFromGoogleAccountData(data);
                }).
                error(function (data, status, headers, config) {
                    console.log("error");
                });
        };

        var getEmployeeFromGoogleAccountData = function (data) {
            console.log("getEmployee called");

            var Employee = Parse.Object.extend("Employee");
            var query = new Parse.Query(Employee);

            var newEmployee = new Employee();
            query.equalTo("email", data['email']);
            query.first({
                success: function (object) {
                    if (typeof object === "undefined") {
                        console.log("Saving new object");
                        newEmployee.set("email", data['email']);
                        newEmployee.set("firstName", data['given_name']);
                        newEmployee.set("lastName", data['family_name']);
                        newEmployee.set("openEvent", false);

                        newEmployee.save(null, {
                            success: function (newEmployee, object) {
                                // Execute any logic that should take place after the object is saved.
                                console.log('New object created with objectId: ' + newEmployee.id);
                            },
                            error: function (newEmployee, error) {
                                // Execute any logic that should take place if the save fails.
                                // error is a Parse.Error with an error code and message.
                                console.log('Failed to create new object, with error code: ' + error.message);
                            }
                        });

                        $scope.employeeName = newEmployee.get("firstName") + " " + newEmployee.get("lastName");

                        //$rootScope.employeeEmail = newEmployee.get("email");
                        //$rootScope.employeeId = newEmployee.get("objectId");
                        //$rootScope.employee = newEmployee;
                        $cookies.employeeId = newEmployee.id;
                        $cookies.employeeName = newEmployee.get("firstName") + " " + newEmployee.get("lastName");
                    } else {
                        console.log(object.get("email"));

                        newEmployee = object;
                        console.log("Found object " + object);
                        console.dir(object);

                        $scope.employeeName = newEmployee.get("firstName") + " " + newEmployee.get("lastName");

                        //$rootScope.employeeEmail = newEmployee.get("email");
                        //$rootScope.employeeId = newEmployee.get("objectId");
                        //$rootScope.employee = newEmployee;
                        $cookies.employeeId = newEmployee.id;
                        $cookies.employeeName = newEmployee.get("firstName") + " " + newEmployee.get("lastName");
                    }
                },
                error: function (error) {
                    console.log("Error: " + error.code + " " + error.message);
                }
            });
        };
    });
})();
