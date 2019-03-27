sportApp.directive('comments', [ function(){

    return {
      restrict: 'EA',
      templateUrl: '/components/comments/comments.html',
      controller: 'commentsCtrl',
      scope: {
        userIsOwner: '=',
        onComment: '&',
        onDelete: '&',
        comments:'=commentsData'
      }
    };
}]);