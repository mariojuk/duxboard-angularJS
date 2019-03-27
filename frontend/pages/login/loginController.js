sportApp.controller('loginController', ['$scope', '$http', '$state', 'AuthService','toastr','notificationService', function($scope, $http, $state, AuthService,toastr,notificationService) {
    $scope.login = function(model) {
        AuthService.login(model).then(function(response) {
            $state.go("app");
            $scope.registrationErrors = [];
        }).catch(function (err) {
            notificationService.error(err.data.msg);
        });
    };
}]);
