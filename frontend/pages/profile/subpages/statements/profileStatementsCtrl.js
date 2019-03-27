sportApp.controller("profileStatementsController", ['$scope', 'httpService', 'popupService', function ($scope, httpService, popupService) {

	$scope.editPost = function(post, index){
		popupService.editPost(post).closePromise.then(function(data){
			if( !_.includes(['$escape','$closeButton','$document'], data.value)){
				if(data.value.updated){
					$scope.feed[index] = data.value.updated;
				}
				else if(data.value.deleted){
					$scope.feed.splice(index,1);
				}
			}
		});
	}

	httpService.getUserFeed($scope.userId, 10)
		.then(function(res) {
			$scope.feed = res.data.posts;
			$scope.feed = res.data;
		})
		.catch(function (err) {
			console.log(err);
		});						
	$scope.updateFeed = function(nextId){
		return httpService.getUserFeed($scope.userId, 10, nextId)
			.then(function(res) {
				$scope.feed= $scope.feed.concat(res.data);
			})
			.catch(function(err) {
				console.log("No more posts.")
			})
	}

}]);