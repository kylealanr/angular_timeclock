(function(){

  angular
       .module('drawer')
       .controller('DrawerController', [
          '$mdSidenav',
          DrawerController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @constructor
   */
  function DrawerController($mdSidenav) {
    var self = this;

    self.selected     = null;
    self.drawerItems        = [
        {
            name: 'Admin',
            avatar: 'admin',
            content: 'Admin panel'
        },
        {
            name: 'Log New',
            avatar: 'notebook',
            content: 'Clock in goes here'
        },
        {
            name: 'Events',
            avatar: 'archive',
            content: 'Clock in here'
        },
        {
            name: 'Settings',
            avatar: 'settings',
            content: "User settings"
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
     * @param menuId
     */
    function selectItem (drawer ) {
      self.selected = angular.isNumber(drawer) ? $scope.drawerItems[drawer] : drawer;
      self.toggleList();
    }
  }

})();