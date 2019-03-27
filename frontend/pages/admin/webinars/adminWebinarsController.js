sportApp.controller("adminWebinarsController", ['$scope', '$http', 'popupService', function ($scope, $http, popupService) {

	$scope.addWebinar = function(){
		var newWebinarPopup = popupService.newWebinar();
		newWebinarPopup.closePromise.then(function(data){
			if(data.value.webinar){
				$scope.webinars.push(data.value.webinar)
			}
		});
	}

	$scope.editWebinar = function(webinar){
		var editWebinarPopup = popupService.editWebinar(webinar);
		editWebinarPopup.closePromise.then(function(data){
			if(data.value.webinar){
				var index = $scope.webinars.indexOf(webinar);
				$scope.webinars[index] = data.value.webinar;
			}
		});
	}

	$scope.deleteWebinar = function(webinar){
		popupService.confirm("DELETE WEBINAR")
		.then(function(){
			$http.delete('api/webinars/' + webinar._id)
			.then(function(res){
				var index = $scope.webinars.indexOf(webinar);
				$scope.webinars.splice(index, 1);
			})
		});
	}

	$scope.presentersString = function(presenters){
		return _.map(presenters, 'name').join(', ');
	}

	$http.get('api/webinars/all').then(function(res){
		$scope.webinars = res.data;
	})

}])