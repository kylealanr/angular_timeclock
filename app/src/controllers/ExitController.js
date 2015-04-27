/**
 * Created by kyle on 4/26/15.
 */
(function () {
    var app = angular.module('timeclock');

    app.controller('ExitController', function ($scope, $rootScope, $cookies, $location) {
        $scope.clearData = function() {

            delete $cookies["APISID"];
            delete $cookies["GCSCU_3CD5E69A3A007417E081FFB8CDFABB1522011194_H4"];
            delete $cookies["HSID"];
            delete $cookies["NID"];
            delete $cookies["PREF"];
            delete $cookies["SAPISID"];
            delete $cookies["SID"];
            delete $cookies["SSID"];
            delete $cookies["gsScrollPos"];
            delete $cookies["employeeId"];
            delete $cookies["employeeName"];
            //$cookies.employeeId = undefined;
            //$cookies.employeeName = undefined;
            $scope.clearDataSuccessMessage = "Success!";
            console.log("cleared all data");
        };

        $scope.authRedirect = function() {
            $location.path('/login');
        };
    });
})();

