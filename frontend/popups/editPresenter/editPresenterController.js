sportApp.controller('editPresenterController', ['$scope', 'notificationService', 'Upload', function ($scope, notificationService, Upload) {

	$scope.presenter = _.clone($scope.ngDialogData.presenter);

	$scope.submit = function(){
		Upload.upload({
            url: $scope.ngDialogData.api,
            data: $scope.presenter,
            file: $scope.file
        }).then(function (res) {
            $scope.closeThisDialog({ presenter : res.data });
        }, function (res) {
            if (res.status > 0){
                notificationService.error(res.data);
            }
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
	}

}])