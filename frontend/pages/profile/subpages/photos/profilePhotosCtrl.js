sportApp.controller("profilePhotosController", ['$scope', 'httpService', "popupService", 'Upload', function ($scope, httpService, popupService, Upload) {

    $scope.deletMediaPhoto= function (pic, index) {
        if($scope.user.tisi){
            var data = { picture: pic }
            var deletePhotoDialog = popupService.open(
                'popups/deleteMediaPhoto/deleteMediaPhoto.html', 600, null, data, null, true);

            deletePhotoDialog.closePromise.then(function(data){
                if(!_.includes(['$escape','$closeButton','$document'], data.value) && data.value === true){
                    $scope.pictures.splice(index, 1);
                }
            })
        }
    };

    $scope.showPhoto = function(pic){
        var media = { img: "uploads/" + $scope.userId + "/profileMedias/" + pic };
        popupService.media($scope.user, "", media);
    }
    
    $scope.publishPhoto= function(){
        Upload.upload({
            url: '/api/profile/'+$scope.userId+'/profileMedias',
            data: {
                file: $scope.file
            }
        }).then(function (res) {
            $scope.pictures.push(res.data);
        }, function (res) {
            if (res.status > 0){
                $scope.errorMsg = res.status + ': ' + res.data;
            }
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
    };

    httpService.getUSerProfileMedia($scope.userId)
    .then(function(res){
        $scope.pictures=res.data;
    })

}]);

