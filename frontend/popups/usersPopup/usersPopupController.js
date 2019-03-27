sportApp.controller('usersPopupController', ['$scope', 'ScrollbarService', function ($scope, ScrollbarService) {
	
	$scope.ngDialogData.getUsers().then(function(res){
		$scope.users = res.data;
		ScrollbarService.getInstance($scope.ngDialogData.title)
		.then(function(scrl){
			scrl.update(true);
		});
	});

}]);