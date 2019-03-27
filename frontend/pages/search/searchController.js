sportApp.controller("searchController", ['$scope', '$state', 'httpService', function ($scope, $state, httpService) {

	if($state.params.user){
		httpService.searchUsers($state.params.user)
			.then(function(res) {
				$scope.users = res.data;
			})
			.catch(function (err) {
				console.log(err);
			});
	}
	else{
		$scope.users = [];
	}


}]);