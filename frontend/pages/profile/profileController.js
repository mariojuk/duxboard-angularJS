sportApp.controller("profileController", ['$state', '$stateParams', 'userService', '$scope', 'httpService', 'popupService', function ($state, $stateParams, userService, $scope, httpService, popupService) {

	$scope.editable = false;
	$scope.toggleEdit = function(){
		$scope.editable = !$scope.editable;
	} 

	var profileLoad = function(){

		$scope.userId = $stateParams.id || userService.getProperty("_id");
		$scope.editProfile = ($scope.userId == userService.getProperty("_id"));
		$scope.coverPhotoUrl = "/uploads/" + $scope.userId + "/cover.jpg";
		$scope.userCv  = "/uploads/" + $scope.userId + "/Cover.pdf";

		httpService.getUser($scope.userId)
			.success(function(data){
				$scope.user = data;
			})
	}

	profileLoad();

    $scope.newMessage = function () {
		if(!$scope.user.tisi){
			var data = {recipients: [$scope.userId]};
	        var newMessageDialog = popupService.open('popups/newMessage/newMessage.html', 500, null, data, null, true);

	        newMessageDialog.closePromise.then(function (data) {
	        	if( !_.includes(['$escape','$closeButton','$document'], data.value)
        		&& data.value){
        			// console.log("conv.id", data.value);
	        		$state.go("app.messages",{id:data.value.conversation})
	        	}
			});
        }
    };

	$scope.addPartner = function(){
		httpService.requestPartner($scope.userId)
			.then(function(res) {
				if (res.status == 200){
					$scope.user.isRequested = true;
				}
			})
	}
	$scope.acceptPartner = function(){
		httpService.acceptPartner($scope.userId)
			.then(function(res) {
				if (res.status == 200){
					$scope.user.hasRequested = false;
					$scope.user.isPartner = true;
					userService.updateProperties({requests: userId}, false);
				}
			})
	}
	$scope.denyPartner = function(){
		httpService.denyPartner($scope.userId)
			.then(function(res) {
				if (res.status == 200){
					$scope.user.hasRequested = false;
					userService.updateProperties({requests: userId}, false)
				}
			})
	}
	$scope.cancelPartner = function(){
		httpService.cancelPartner($scope.userId)
			.then(function(res) {
				if (res.status == 200){
					$scope.user.isRequested = false;
				}
			})
	}
	$scope.removePartner = function(){
		httpService.removePartner($scope.userId)
			.then(function(res) {
				if (res.status == 200){
					$scope.user.isPartner = false;
				}
			})
	}

}]);