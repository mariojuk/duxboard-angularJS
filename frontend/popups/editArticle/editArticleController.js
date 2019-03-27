sportApp.controller('editArticleController', ['$scope', 'httpService', 'popupService', 'Upload', function ($scope, httpService, popupService, Upload) {
	$scope.article = _.clone($scope.ngDialogData.article);

	$scope.editArticle = function (title, text, file) {
		Upload.upload({
            url: '/api/article/' + $scope.article._id,
            method: 'PUT',
            data: {
                title: title,
                text: text,
                file: file
            }
        }).then(function (res) {
            if(res.status == 200){
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

	$scope.deleteArticle = function(){
		popupService.confirm("DELETE ARTICLE").then(function(){
			httpService.deleteArticle($scope.article._id).then(function(){
					$scope.closeThisDialog({deleted: "nyes"});

			});
		});
	}


}]);