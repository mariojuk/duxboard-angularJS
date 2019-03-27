sportApp.directive('post', [ function(){

    return {
      restrict: 'EA',
      templateUrl: '/components/post/post.html',
      controller: 'postCtrl',
      scope: {
        buttonLabel: '@?',
        onPost: '&onPost',
        placeholder: '@?',
        text: '=?',
        media: '=?',
        onTypingStarted: '&',
        onTypingStopped: '&',
        maxChars: '=?',
		showArticleButton: '=?'
      },
      link: function(scope, element){
        if(angular.isUndefined(scope.buttonLabel)){
          scope.buttonLabel = "PUBLISH"
        }
        if(angular.isUndefined(scope.text)){
          scope.text = "";
        }
        if(angular.isUndefined(scope.maxChars)){
          scope.maxChars = 150;
        }
        if(angular.isUndefined(scope.placeholder)){
          scope.placeholder = "Make your statement";
        }
	if(angular.isUndefined(scope.showArticleButton)){
          scope.showArticleButton = false;
        }
        // var input = element.context.childNodes[0].childNodes[1];
        // element.bind('click', function(e){
        //   input.focus();
        // })
      }
    };
}]);
