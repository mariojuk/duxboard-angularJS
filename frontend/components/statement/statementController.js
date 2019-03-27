sportApp.controller('statementCtrl', ["$scope", "httpService", "userService", "popupService", function($scope, httpService, userService, popupService) {

	$scope.userId = userService.getProperty("_id");

	$scope.getLikes = function(){
		popupService.users({
            title: "STATUS LIKES",
            getUsers: function(){
            	return httpService.getStatusLikes($scope.post._id);
            }
      	})
	}

	$scope.viewMedia = function(){
		popupService.media($scope.post.user, $scope.post.text, $scope.post.media);
	}

	$scope.likeStatement = function(){
		if( !$scope.post.liked ){
			httpService.likeStatus($scope.post._id)
				.success(function(data) {
					$scope.post.comments = data.comments;
					$scope.post.likes = data.likes;
					$scope.post.liked = data.liked;
				})
				.error(function(err) {
					console.log(err);
				});
		}
		else{
			httpService.unlikeStatus($scope.post._id)
				.success(function(data) {
					$scope.post.comments = data.comments;
					$scope.post.likes = data.likes;
					$scope.post.liked = data.liked;
				})
				.error(function(err) {
					console.log(err);
				});
		}
	};

}]);