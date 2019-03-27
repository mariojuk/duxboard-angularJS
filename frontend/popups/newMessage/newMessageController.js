sportApp.controller('newMessageController', ['$scope', 'httpService', function ($scope, httpService) {
	$scope.postMessage = function(text, file){
		// console.log($scope.recipients);
		httpService.newConversation($scope.ngDialogData.recipients, text)
			.success(function(data){
				$scope.closeThisDialog(data);
			})
			.error(function(err){
				console.log(err);
			})
	}
}]);