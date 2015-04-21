(function(){

  angular
       .module('users')
       .controller('UserController', [
          '$mdSidenav',
          UserController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @constructor
   */
  function UserController($mdSidenav) {
    var self = this;

    self.selected     = null;
    self.users        = [
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
    self.selectUser   = selectUser;
    self.toggleList   = toggleUsersList;

    // *********************************
    // Internal methods
    // *********************************

    /**
     * hide or Show the 'left' sideNav area
     */
    function toggleUsersList() {
        $mdSidenav('left').toggle();
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectUser ( user ) {
      self.selected = angular.isNumber(user) ? $scope.users[user] : user;
      self.toggleList();
    }
  }

})();
