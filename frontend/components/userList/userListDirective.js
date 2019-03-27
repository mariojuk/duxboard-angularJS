sportApp.directive('userList', [ function(){

    return {
      restrict: 'EA',
      templateUrl: '/components/userList/userList.html',
      controller: 'userListCtrl',
      scope: {
        loadMore: '&loadMore',
        users:'=usersData',
        showTime:'=?',
        updateList:'='
      },
      link: function(scope){
        if(!scope.showTime){
          scope.showTime = false;
        }
      }
    };
}]);