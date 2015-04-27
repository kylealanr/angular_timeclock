/**
 * Created by kyle on 4/26/15.
 */
(function () {
    var app = angular.module('timeclock');

    app.controller('ExitController', function ($scope, $rootScope, $cookies, $location) {
        $scope.clearData = function() {
            $cookies.employeeId = undefined;
            $cookies.employeeName = undefined;
            $scope.clearDataSuccessMessage = "Success!";
            console.log("cleared all data");
        };

        $scope.authRedirect = function() {
            $location.path('/login');
        };
    });
})();

