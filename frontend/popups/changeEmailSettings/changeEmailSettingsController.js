sportApp.controller("changeEmailSettingsController",   ['$scope',  '$state', 'AuthService','$stateParams','httpService','popupService',function($scope, $state, AuthService, $stateParams,httpService,popupService) {
    $scope.changeMail= function (model) {
        AuthService.changeMail(model ,$stateParams.token)
            .then(function (response) {
                popupService.notify("E-Mail","CHECK YOUR E-MAIL FOR CONFIRMATION",true);
        }).catch(function (err) {
                popupService.notify("Error",err.data,false);
        });
    }
     if($stateParams.token!=null)
    {
        httpService.getChangeEmail($stateParams.token).then(function () {
            AuthService.logout();
            $state.go('login');
        });
    }
}]);
