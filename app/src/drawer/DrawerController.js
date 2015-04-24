(function(){

  angular
       .module('drawer')
       .controller('DrawerController', [
          '$mdSidenav',
          '$location',
          DrawerController
       ]);

  function DrawerController($mdSidenav, $location) {
    var self = this;

    self.selected     = null;
    self.drawerItems        = [
        {
            name: 'Log New',
            avatar: 'notebook',
            content: 'Clock in goes here',
            relativeUrl: '/clock_in'
        },
        {
            name: 'Events',
            avatar: 'archive',
            content: 'Clock in here',
            relativeUrl: '/events'
        },
        {
            name: 'Login',
            avatar: 'settings',
            content: "User settings",
            relativeUrl: '/login'
        },
    ];
    self.selectItem   = selectItem;
    self.toggleList   = toggleDrawer;

    // *********************************
    // Internal methods
    // *********************************

    /**
     * hide or Show the 'left' sideNav area
     */
    function toggleDrawer() {
        $mdSidenav('left').toggle();
    }

    /**
     * Select the current avatars
     * @param drawer
     */
    function selectItem (drawer) {
      self.selected = angular.isNumber(drawer) ? $scope.drawerItems[drawer] : drawer;
      console.log($location);
      $location.path(self.selected.relativeUrl);
      self.toggleList();
    }
  }

})();
