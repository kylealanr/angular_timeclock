/**
 * Created by kyle on 4/21/15.
 */
angular.module('users')
       .controller('UserController', [UserController]);

function UserController(){
    var self = this;

    var getUserInfo = function($endpoint){
        $http.get($endpoint).
            success(function(data, status, headers, config) {
                console.log(data);
            }).
            error(function(data, status, headers, config) {
                console.log("error");
            });
    };
}