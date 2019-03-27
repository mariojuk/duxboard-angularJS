sportApp.controller("requestsController", ['$scope', 'httpService', function ($scope, httpService) {


	httpService.getRequests(10)
		.then(function(res) {
			$scope.requests = res.data;
		})
		.catch(function (err) {
			console.log(err);
		});

	httpService.getPendingRequests().then(function(res) {
		$scope.pending = res.data;
	})

}]);