sportApp.controller("adminPresentersController", ['$scope', '$state', 'popupService', '$http', function ($scope, $state, popupService, $http) {

	$scope.addWebinar = function(presenter){
		var newWebinarPopup = popupService.newWebinar([presenter]);
		newWebinarPopup.closePromise.then(function(data){
			if(data.value.webinar){
				$state.go('app.admin.webinars');
			}
		});
	}

	$scope.addPresenter = function(){
		var newPresenterPopup = popupService.newPresenter();
		newPresenterPopup.closePromise.then(function(data){
			if(data.value.presenter){
				$scope.presenters.push(data.value.presenter)
			}
		});
	}

	$scope.editPresenter = function(presenter){
		var editPresenterPopup = popupService.editPresenter(presenter);
		editPresenterPopup.closePromise.then(function(data){
			if(data.value.presenter){
				var index = $scope.presenters.indexOf(presenter);
				$scope.presenters[index] = data.value.presenter;
			}
		});
	}

	$scope.deletePresenter = function(presenter){
		popupService.confirm("DELETE PRESENTER")
        .then(function(){
			$http.delete('api/presenter/' + presenter._id)
			.then(function(res){
				var index = $scope.presenters.indexOf(presenter);
				$scope.presenters.splice(index, 1);
			})
		});
	}

	$http.get('api/presenter/all').then(function(res){
		$scope.presenters = res.data;
	})

}])
