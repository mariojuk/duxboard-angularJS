sportApp.controller("unblockUsersController",  ['$scope', 'httpService',function ($scope, httpService) {
    httpService.getBlockedUsersList().then( function (res) {
            $scope.blockedUSers=res.data;
            if(!$scope.blockedUSers[0]){
                 $scope.blockedUSers=[]; 
                
            }
        });
    $scope.removeFromBlocked=function (id) {
        httpService.deleteUnblockUser(id).then(function (res) {
            console.log(res);
        });
        httpService.getBlockedUsersList().then( function (res) {
            $scope.blockedUSers=res.data;
            console.log($scope.blockedUSers)
        });
    };
}]);
