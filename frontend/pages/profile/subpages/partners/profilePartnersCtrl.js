sportApp.controller("profilePartnersController", ['$scope', 'httpService', function ($scope, httpService) {
	
	$scope.moreUsers = function(){
		httpService.getPartners($scope.userId,10,$scope.users.length+1)
			.then(function(res){
				 $scope.users =$scope.users.concat(res.data);
	             
			})
	}

	httpService.getPartners($scope.userId)
		.then(function(res){
			$scope.users = res.data;
			console.log(res.data)
			 
		});

}]);
