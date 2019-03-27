sportApp.controller('packagesController', ['$scope','$state','$stateParams','httpService', function($scope,  $state,$stateParams,httpService) {

   $scope.selectPackage = function(package) {  
         httpService.postPackage($stateParams.id,package)
            .then(function(response){
                 $scope.message=response.data.email;
                 $state.go('thankBox',{email:response.data.email});
            });     
    }

}]);
