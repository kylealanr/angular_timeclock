/**
 * Created by kyle on 4/26/15.
 */
(function () {
    var app = angular.module('timeclock');

    app.controller('ExitController', function ($scope, $rootScope, $cookies, $location) {
        $scope.clearData = function() {

            $rootScope.$broadcast('event:google-plus-signin-failure');
        };

        $scope.$on('event:google-plus-signin-failure', function () {
            delete $cookies["employeeId"];
            delete $cookies["employeeName"];
            //$cookies.employeeId = undefined;
            //$cookies.employeeName = undefined;
            $scope.clearDataSuccessMessage = "Success!";
            console.log("cleared all data");
            gapi.auth.signOut();
        });

        $scope.authRedirect = function() {
            $location.path('/login');
        };
    });
})();

