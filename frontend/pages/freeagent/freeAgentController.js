sportApp.controller("freeAgentController",  ['$scope', 'httpService','popupService', 'userService','$stateParams',
    function ($scope, httpService,popupService, userService,$stateParams) {
        $scope.myBanners = [];
        $scope.createBanner=function () {
            var createBanner = popupService.open('popups/freeAgent/createBanner/createBanner.html', 500, null, {}, $scope, true);
            createBanner.closePromise.then(function(data){
                if(data.value._id){
                    data.value.user = userService.getUser();
                    $scope.myBanners.unshift(data.value);
                    $scope.agentBanners.unshift(data.value);
                }
            })
        };

        $scope.deleteBanner=function (number) {
           httpService.deleteFreeAgentBaner(number);
            $scope.message="Banner Deleted";
            $scope.closeThisDialog()
        };

        httpService.getMyBanners().then(function (res) {
            $scope.myBanners=res.data;
        });

        httpService.getFreeAgentBanner().then(function (res) {
            $scope.agentBanners=res.data;
        });

        $scope.editBanner=function (banner, index) {
            var editPopup = popupService.open('popups/freeAgent/editBanner/editBanner.html', 500, null, banner, null, true);
            editPopup.closePromise.then(function(data){
                if(data.value === false){
                    _.remove($scope.agentBanners, function(obj){
                        return obj._id == $scope.myBanners[index]._id;
                    })
                    $scope.myBanners.splice(index,1);
                }
            })
        };
}]);