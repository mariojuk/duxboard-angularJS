sportApp.controller('changeCoverController', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.myImage='';
    $scope.myCroppedImage='';
    
    $scope.upload = function (dataUrl, name) {
        Upload.upload({
            url: '/api/profile/cover',
            data: {
                file: Upload.dataUrltoBlob(dataUrl)
            },
        }).then(function (response) {
            $timeout(function () {
                $scope.coverPhotoUrl += "?decache=" + Math.random();
                $scope.closeThisDialog($scope.coverPhotoUrl);
            });
        }, function (response) {
            if (response.status > 0) $scope.errorMsg = response.status 
                + ': ' + response.data;
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
    }
}]);