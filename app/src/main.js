/**
 * Created by kyle on 4/25/15.
 */

(function() {
    Parse.initialize("AVKrYGejn3pUMZ3m1JiYWkG2tnT3FhFSQM4iWgz6", "QPHxANIlclXKQZix2WDuVtbFMUBrSkVZCFSeNsrb");
    var app = angular.module('timeclock', ['ngMaterial', 'drawer', 'directive.g+signin', 'ngRoute', 'ngCookies']);
    app.config(function ($mdThemingProvider, $mdIconProvider, $routeProvider) {
        $mdIconProvider
            .defaultIconSet("./assets/svg/avatars.svg", 128)
            .icon("menu", "./assets/svg/menu.svg", 24)
            .icon("archive", "./assets/svg/archive.svg", 128)
            .icon("timeclock", "./assets/svg/timeclock.svg", 128)
            .icon("exit_door", "./assets/svg/exit_door.svg", 128);

        $mdThemingProvider.theme('default')
            .primaryPalette('cyan')
            .accentPalette('light-blue');

        $routeProvider
            .when('/', {
                templateUrl: 'src/views/new_event.html'
            })
            .when('/login', {
                templateUrl: 'src/views/auth.html'
            })
            .when('/exit', {
                templateUrl: 'src/views/exit.html'
            })
            .when('/events', {
                templateUrl: 'src/views/event_list.html'
            })
            .when('/clock_in', {
                templateUrl: 'src/views/new_event.html'
            }).otherwise('', {
                templateUrl: 'src/views/new_event.html'
            });
    })
})();
