sportApp.controller('newArticleController', ['$scope', 'Upload', '$state','notificationService', function ($scope, Upload, $state,notificationService) {

	$scope.postNew = function(title, text, file){
		Upload.upload({
            url: '/api/article',
            data: {
            	title: title,
                text: text,
                file: file
            }
        }).then(function (res) {
            if(res.status == 201){
                $state.go("app.profile");
			}
        }, function(err) {
            notificationService.warning(err.data);
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
	}

}]);
