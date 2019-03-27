sportApp.controller("profileArticlesController", ['$scope', 'httpService', "popupService", function ($scope, httpService, popupService) {


	httpService.getUserArticles($scope.userId)
		.then(function(res) {
			$scope.articles = res.data;
		});

	$scope.onEdit = function(article, index){
		popupService.editArticle(article).closePromise.then(function(data){
			if( !_.includes(['$escape','$closeButton','$document'], data.value)){
				if(data.value.updated){
					$scope.articles[index] = data.value.updated;
				}
				else if(data.value.deleted){
					$scope.articles.splice(index,1);
				}
			}
		});
	}

}]);