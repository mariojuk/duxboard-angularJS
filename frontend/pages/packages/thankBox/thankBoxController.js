sportApp.controller("thankBoxController", ['$scope', 'httpService','$stateParams','$state', function ($scope,httpService,$stateParams,$state) {

	$scope.userEmail = $stateParams.email;
	$scope.resendMails = function() {
	      httpService.resendMail($stateParams.email)
	              .then(function(){
	               $state.go('app.home');

	        });
    }
     $scope.login = function() {   
            $state.go('login');
          
        };
}]);

