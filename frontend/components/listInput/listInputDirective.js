sportApp.directive('listInput', [ function(){

    return {
      restrict: 'EA',
      templateUrl: '/components/listInput/listInput.html',
      controller: 'listInputController',
      scope: {
        list: '=',
        placeholder: '@',
        showInput: '=',
        sampleData: '=?'
      },
      link: function($scope){
        $scope.updateSamples = function(){
          $scope.sampleData = _.sampleSize(_.difference($scope.sampleData, $scope.list), 5);
        }
        $scope.updateSamples()
      }
    }

}]);