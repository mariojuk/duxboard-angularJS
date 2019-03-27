sportApp.controller("terminateAccountController",  ['$scope', 'AuthService','$stateParams','httpService', function($scope, AuthService, $stateParams,httpService) {
    $scope.terminate= function (model) {
        var params={"password":model.password,"explanation":model.explanation};
        $scope.message="Wrong password"
        httpService.postTerminateAccount(params).then(function(res) {
            $scope.message = res.data;
        })
    };
    if($stateParams.token!=null)
    {
        if(httpService.getTerminateAccount($stateParams.token))
        {
            console.log("Account Delated");
            AuthService.logout();
            $state.go('login');
        }
    }
}]);