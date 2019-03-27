sportApp.controller('sharePostController', ['$scope', 'httpService', function ($scope, httpService) {
	var post = $scope.ngDialogData.post;
	
	$scope.sharePost = function (text) {
		return httpService.shareStatus(post._id, text).then(function (res) {
			res.data.media.post = post;
			$scope.closeThisDialog(res.data);
		});
	};
}]);