sportApp.controller('editPostController', ['$scope', 'httpService', 'popupService', 'Upload', function ($scope, httpService, popupService, Upload) {
	$scope.post = _.clone($scope.ngDialogData.post);

	$scope.editPost = function (text, file) {
		Upload.upload({
            url: '/api/status/' + $scope.post._id,
            method: 'PUT',
            data: {
                text: text,
                file: file
            }
        }).then(function (res) {
            if(res.status == 200){
            	console.log(res.data);
				$scope.closeThisDialog({updated: res.data});
			}
        }, function (res) {
            if (res.status > 0){
            	$scope.errorMsg = res.status + ': ' + res.data;
            }
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
	};

	$scope.deletePost = function(){
		popupService.confirm("DELETE STATEMENT").then(function(){
			httpService.deleteStatus($scope.post._id).then(function(){
					$scope.closeThisDialog({deleted: "nyes"});
			});
		});
	}

}]);