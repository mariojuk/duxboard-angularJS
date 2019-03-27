sportApp.controller('forgotpasswordController', ['$scope', '$http', '$state', 'AuthService', function($scope, $http, $state, AuthService) {
    $scope.forgot= function (model) {
        AuthService.forgot(model).then(function (response) {
            $scope.message=response.data;
        }).catch(function (err) {
            $scope.message = err.data
        });
    }
}]);
