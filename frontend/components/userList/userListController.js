sportApp.controller('userListCtrl', ["$scope", "httpService", "popupService", "userService", "$timeout", function($scope, httpService, popupService, userService, $timeout) {
	
	$scope.addPartner = function(user){
		httpService.requestPartner(user._id)
			.then(function(res) {
				user.isRequested = true;
			})
	}
	$scope.acceptPartner = function(user, index){
		httpService.acceptPartner(user._id)
			.then(function(res) {
				user.hasRequested = false;
				user.isPartner = true;
				if($scope.updateList){
					$scope.users.splice(index, 1);
				}
				userService.updateProperties({requests: user._id}, false)
			})
	}
	$scope.denyPartner = function(user, index){
		httpService.denyPartner(user._id)
			.then(function(res) {
				user.hasRequested = false;
				if($scope.updateList){
					$scope.users.splice(index, 1);
				}
				userService.updateProperties({requests: user._id}, false)
			})
	}
	$scope.cancelPartner = function(user, index){
		httpService.cancelPartner(user._id)
			.then(function(res) {
				user.isRequested = false;
				if($scope.updateList){
					$scope.users.splice(index, 1);
				}
			})
	}

	$scope.removePartner = function(user, index){
		popupService.confirm("DELETE PARTNER", "", "DELETE", "NO")
			.then(function(res) {
				httpService.removePartner(user._id)
					.then(function(res){
						user.isPartner = false;
						user.deleted = true;
						$timeout(function(){
							$scope.users.splice(index, 1);		
						},2000)
					})
			})
	}

	$scope.getMutualPartners = function(user){
       	popupService.users({
            title: "MUTUAL PARTNERS WITH " + user.firstName + " " + user.secondName,
            getUsers: function(){
            	return httpService.getMutualPartners(user._id);
            }
    	})
	}

}]);