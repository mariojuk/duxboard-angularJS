sportApp.directive('statement', [ function(){

    return {
      restrict: 'EA',
      templateUrl: '/components/statement/statement.html',
      controller: 'statementCtrl',
      scope: {
        post: '=statementData',
        editable: '=?',
        onEdit: '&?',
        onDelete: '&?',
        onShare: '&?',
        onCommentsClick: '&?',
        hideActions: '=?'
      }
    };
}]);