sportApp.directive('articlePost', [ function(){

    return {
      restrict: 'EA',
      templateUrl: '/components/articlePost/articlePost.html',
      controller: 'articlePostController',
      scope: {
        buttonLabel: '@?',
        onPost: '&onPost',
        articleTitle: '=?',
        articleContent: '=?',
        image: '=?',
        maxChars: '=?'
      },
      link: function(scope, element){
        if(!scope.buttonLabel){
          scope.buttonLabel = "PUBLISH"
        }
      }
    };
}]);