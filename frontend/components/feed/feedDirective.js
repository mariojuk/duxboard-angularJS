sportApp.directive('feed', [ function(){

    return {
      restrict: 'EA',
      templateUrl: '/components/feed/feed.html',
      controller: 'feedCtrl',
      scope: {
        updateFeed: '&updateFeed',
        updateOnShare: '=',
        editable: '=?',
        onEdit: '&?',
        posts:'=feedData',
        comms:'=showComments'
      }
    };
}]);