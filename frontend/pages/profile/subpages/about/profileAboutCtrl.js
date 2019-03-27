sportApp.controller("profileAboutController", ['$scope', 'httpService','popupService','$http','notificationService', 'Upload', 'userService', function ($scope, httpService,popupService,$http,notificationService,Upload, userService) {
	httpService.getUserDetails($scope.userId)
		.then(function(res) {
			$scope.user = res.data;
			$scope.coverPhotoUrl = "/uploads/" + $scope.userId + "/cover.jpg";
		});

	$scope.sampleInterests = ["Sport", "Technology", "Startups", "Memes", "Juventus", "Politics", "Music"];

	$scope.Update = function(){
		//ne pošalje se prazni array, bug kod ngFileUploada?
		Upload.upload({
            url: '/api/profile/'+$scope.userId+'/about',
            data: $scope.user,
            file: $scope.file
        }).then(function (res) {
        	_.forOwn(res.data, function(value, key) {
        		$scope.user[key] = value;
        	});
        	if(res.data.CV){
        		$scope.$parent.user.CV = res.data.CV; 
        	}
        	$scope.$parent.editable = false;
        	notificationService.success("Profile info changed!", true);
        }, function (res) {
            if (res.status > 0){
                $scope.errorMsg = res.status + ': ' + res.data;
            }
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
	};

	$scope.editProfilePic = function() {
		if($scope.user.tisi){
	        var changeProfileDialog = popupService.open('popups/changeProfile/changeProfile.html', 500, null, {}, $scope, true);

	        changeProfileDialog.closePromise.then(function (data) {
	        	$scope.togglePicOptions = false;
	        	if( !_.includes(['$escape','$closeButton','$document'], data.value)
        		&& data.value != $scope.user.profilePicture){
        			$scope.user.profilePicture = data.value;
	        		$scope.$parent.user.profilePicture = data.value;
	        		userService.setProperty("profilePicture", data.value);
	        		notificationService.success("Profile picture changed!", true)
	        	}
			});
        }
    };

    $scope.editCoverPhoto = function () {
		if($scope.user.tisi){
	        var changeCoverDialog = popupService.open('popups/changeCover/changeCover.html', 792, null, {}, $scope, true);

	        changeCoverDialog.closePromise.then(function (data) {
	        	if( !_.includes(['$escape','$closeButton','$document'], data.value)
        		&& data.value != $scope.coverPhotoUrl){
	        		$scope.coverPhotoUrl = data.value;
	        	}
			});
        }
    };


}]);