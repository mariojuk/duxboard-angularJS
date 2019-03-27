sportApp.controller('moreArticleController', ['$scope', 'ScrollbarService', function ($scope, ScrollbarService) {

	$scope.ngDialogData.getArticle().then(function(res){
		$scope.users = res.data;
		ScrollbarService.getInstance('articlesListScrollbar')
		.then(function(scrl){
			scrl.update(true);
		});
	});

}]);