sportApp.controller('openNewArticlePopupController', ['$scope', 'Upload', '$state', function ($scope, Upload, $state) {

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
                $state.go("app.profile.articles");
			}
        }, function (res) {
            if (res.status > 0){
            	$scope.errorMsg = res.status + ': ' + res.data;
            }
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
	}
	

}]);