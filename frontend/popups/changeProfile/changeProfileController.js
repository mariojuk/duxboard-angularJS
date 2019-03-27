sportApp.controller('changeProfileController', ['$scope', 'Upload', '$timeout', 'userService', function ($scope, Upload, $timeout, userService) {
    $scope.myImage='';
    $scope.myCroppedImage='';
    
    $scope.upload = function (dataUrl, name) {
        Upload.upload({
            url: '/api/profile/picture',
            data: {
                file: Upload.dataUrltoBlob(dataUrl)
            },
        }).then(function (response) {
            $timeout(function () {
                $scope.closeThisDialog(response.data.profilePicture);
            });
        }, function (response) {
            if (response.status > 0) $scope.errorMsg = response.status 
                + ': ' + response.data;
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
    }
}]);
    
