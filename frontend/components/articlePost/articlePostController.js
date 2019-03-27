sportApp.controller("articlePostController", ["$scope", function($scope){

	$scope.articleWords = 0;
	$scope.articleLength = 0;


	$scope.updateArticleLength = function(text){
		$scope.articleWords = text.match(/\S+/g).length;
		$scope.articleLength = text.length;
	}

	$scope.onCreated = function (editor) {
		if($scope.articleContent){
			editor.clipboard.dangerouslyPasteHTML($scope.articleContent);
		}
	};
	
}]);