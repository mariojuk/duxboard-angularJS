sportApp.controller('deleteMediaPhotoController', ['$scope', 'userService', 'httpService', '$window', function ($scope, userService, httpService, $window ) {
    
	$scope.userId = userService.getProperty('_id');

    $scope.deletePicture= function(){
        httpService.deleteProfileMedia($scope.userId, $scope.ngDialogData.picture)
        	.then(function(){ $scope.closeThisDialog(true); })
        	.catch(function(){ $scope.closeThisDialog(false); })
    };

}]);
