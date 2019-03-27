sportApp.controller('changepasswordController', ['$scope', '$http', '$state', 'AuthService','$stateParams', function($scope, $http, $state, AuthService, $stateParams) {
    $scope.changePassword= function (model) {
        if(model.password==model.confirmPassword)
        {
            AuthService.changePassword(model ,$stateParams.token).then(function (response) {
                $scope.message=response.data;
            }).catch(function (err) {
                $scope.message = err.data
            });
        }else{
            $scope.message="passwords do not match"
        }
    }
}]);
