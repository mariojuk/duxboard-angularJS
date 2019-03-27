angular
.module('lpApp', ['angular-flippy'])
.controller('landingPageController', ['$scope', '$http', function($scope, $http) {
    $scope.formData = {};

    $scope.duxTrail = "Processing request . . ."

    $scope.addToDatabase = function() {

        $scope.boxHeight = angular.element(".lpPromoBox")[0].offsetHeight + "px";    
        $scope.toggleTransition = true;

        $http.post('/api/preorder', $scope.formData)
            .success(function(data) {
                $scope.duxTrail = "Thank you for signing up for Duxboard Prime free trial.";
            })
            .error(function(err) {
                $scope.duxTrail = "Error while processing your request. Check your email to see if you have already signed up."
            });

        $scope.$broadcast("signUpResponse");
    }

}]);