sportApp.controller('createBannerController',  ['$scope','$stateParams', 'userService', 'httpService', "notificationService", 'Upload', 'constantServices',
    function ($scope, $stateParams, userService, httpService, notificationService, Upload, constantServices) {
        $scope.model = {
            file: []
        };
        $scope.sports = constantServices.getSport();
        $scope.userId = userService.getProperty("_id");

        $scope.publishBanner=function () {
            console.log($scope.model);
            Upload.upload({
                arrayKey: '',
                url: '/api/freeagent/createBanner',
                data: $scope.model
            }).then(function (res) {
                $scope.closeThisDialog(res.data);
            }, function (res) {
                if (res.status > 0){
                    notificationService.error(res.data);
                }
            }, function (evt) {
                $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                console.log($scope.progress);
            });
        }

}]);