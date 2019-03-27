sportApp.controller('editBannerController',  ['$scope','$stateParams', 'httpService', "popupService", 'Upload','constantServices',
    function ($scope, $stateParams, httpService, popupService, Upload, constantServices) {
        
        $scope.sports = constantServices.getSport();
        $scope.banner = $scope.ngDialogData;
        
        $scope.updateBanner=function () {
            httpService.editFreeAgentBanner($scope.banner)
            .then(function(){
            	$scope.closeThisDialog(true);
            })
        }
		$scope.deleteBanner = function(){
		    popupService.confirm("DELETE BANNER").then(function(){
		        httpService.deleteFreeAgentBanner($scope.banner._id).then(function(){
		                $scope.closeThisDialog(false);
		        });
		    });
		}
}]);