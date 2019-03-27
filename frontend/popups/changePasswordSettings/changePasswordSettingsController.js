sportApp.controller("changePasswordSettingsController",  ['$scope','$state', 'AuthService','$stateParams','httpService','popupService', function($scope,$state, AuthService, $stateParams,httpService,popupService) {
     $scope.changePass= function (model) {
       
        var params= {
            oldPassword:model.oldPassword,
            newPassword:model.newPassword
        };
        if(model.newPassword==model.passwordConfirmation)
        {
            AuthService.changePass(params)
              .then(function (response) {
                   popupService.notify("E-Mail","CHECK YOUR E-MAIL FOR CONFIRMATION",true);
            }).catch(function (err) {
                    popupService.notify("Error",err.data,false);
            });
        }else{
            popupService.notify("Error","Your new password is not the same",false);
        }
    }
    if($stateParams.token)
        {
            httpService.getChangePasswordSettings($stateParams.token).then(function () {
                AuthService.logout();
                $state.go('login');
            });
        }
           
}]);