sportApp.controller("inviteGmailController",['$scope', 'httpService', 'popupService',function($scope, httpService, popupService){

	$scope.contacts = $scope.ngDialogData.contacts;
	$scope.selected=[];
	
	$scope.exist=function(item){
		return $scope.selected.indexOf(item)> -1;
	}

	$scope.toggleSelection=function(item){
		var idx=$scope.selected.indexOf(item.email);
		if(idx > -1){
			$scope.selected.splice(idx,1);
		}
		else{
			$scope.selected.push(item.email);
		}
	}
	

	$scope.invite = function() {
      httpService.inviteGoogleFriends($scope.selected)
	 
           .then(function(res){
		   popupService.notify("E-Mail","YOUR INVITES HAVE BEEN SENT",true);
	   })
			.catch(function(res){
				popupService.notify("Error",res.data,false);
			})
    }
}]);