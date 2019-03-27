sportApp.controller('headerController', ['$rootScope', '$scope', '$state', 'userService', 'screenSize', function($rootScope, $scope, $state, userService, screenSize) {

  $scope.currentUser = userService.getUser();

  $scope.$on("set-nav-visibility", function(data, value){
    $scope.showNav = value;
  })

  $scope.toggleNav = function(){
    $rootScope.$broadcast('toggle-nav');
  }

  $scope.toggleSidebar = function(){
    $rootScope.$broadcast('toggle-menu');
  };

  $scope.searchUsers = function(user){
  	$state.go('app.search', {user: user});
  }

  $scope.showSearch = !screenSize.is('tablet');

  screenSize.when('mobile, desktop', function(){
    $scope.showSearch = true;
  })

}]);
