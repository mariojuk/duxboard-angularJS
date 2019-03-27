sportApp.controller('listInputController', ['$scope', function($scope) {

	$scope.addToList = function(newItem){
		if(newItem && !_.includes($scope.list, newItem)){
			if(!$scope.list){
				$scope.list = [newItem];
			}else{
				$scope.list.push(newItem);
			}
			$scope.updateSamples();
			$scope.newItem = '';
		}
	}

	$scope.clearInput = function(index){
		if($scope.list[index] == ""){
			$scope.list.splice(index, 1);
		}
	}

}]);
