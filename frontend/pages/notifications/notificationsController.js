sportApp.controller("notificationsController", ['$scope', '$state', 'httpService', 'userService', function ($scope, $state, httpService, userService) {

	$scope.viewNotification = function(notif){
		if(notif.data){
			$state.go("app." + notif.data.name, notif.data.params);
		}
	}

	var loadNotifications = function(){
		httpService.getNotificationFeed().then(function(res){
			$scope.feed = res.data;
		})
		userService.setProperty("notifications", 0);
		$scope.notifSelected = true;
		$scope.selectedFilter = $scope.filters[0].value;
	}

	var loadActivity = function(){
		httpService.getUserActivity().then(function(res){
			$scope.activity = res.data;
		})
		$scope.notifSelected = false;
		$scope.selectedFilter = $scope.filters[0].value;
	}

	$scope.filters = [
		{
			text: "All activity",
			value: [0]
		},
		{
			text: "Partnerships",
			value: [90]
		},
		{
			text: "Posts",
			value: [100, 200]
		},
		{
			text: "Webinars",
			value: [1000]
		}
	]

	loadNotifications();


	$scope.setFilter = function(value){
		$scope.selectedFilter = value;
	}

	$scope.toggleSelection = function(){
		if($scope.notifSelected){
			loadActivity();
		}
		else{
			loadNotifications();
		}
	}

}]);
