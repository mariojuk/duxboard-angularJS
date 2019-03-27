sportApp.controller("statusController", ['$stateParams', '$scope', 'httpService', function ($stateParams, $scope, httpService) {

	var id = $stateParams.id;

	if(id===undefined){
		//404
	}
	else{
		httpService.getStatus(id)
			.then(function(res) {
				// console.log(res);
				$scope.status = [res.data];
			})
			.catch(function (err) { console.log(err); });
	}

}]);