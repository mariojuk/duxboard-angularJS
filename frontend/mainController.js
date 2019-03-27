sportApp.controller("mainController", ['$rootScope', '$state', '$scope', 'screenSize', '$window', 'AuthService', 'popupService', 'userService', 'notificationService',
	function ($rootScope, $state, $scope, screenSize, $window, AuthService, popupService, userService, notificationService) {

	var socket = AuthService.socket();

	$scope.shownav = false;
	$scope.contentHeight = $window.innerHeight + "px";

	var toggleNav = function(value){
		$scope.shownav = (value == undefined) ? !$scope.shownav : value;
		$rootScope.$broadcast("set-nav-visibility", $scope.shownav);
	}

	$scope.swipeLeft = function(){
		if($scope.isMobile){
			if($scope.showmenu){
				$scope.showmenu = false;
			}
			else{
				toggleNav();
			}
		}
	}
	$scope.swipeRight = function(){
		if($scope.isMobile){
			if($scope.shownav){
				toggleNav();
			}
			else{
				$scope.showmenu = true;
			}
		}
	}

	$rootScope.$on('set-menu-visibility', function(value){
		$scope.showmenu = false;
	});

	$scope.$on('toggle-menu', function(event, data){
		$scope.showmenu = !$scope.showmenu;
		if($scope.shownav){
			toggleNav();
		}
	})
	$scope.$on('toggle-nav', function(){
		toggleNav();
		if($scope.showmenu){
			$scope.showmenu = false;
		}
	})

	$scope.isMobile = screenSize.is('mobile');
	$scope.showmenu = !screenSize.when('mobile', function(){
		//$scope.showmenu = false;
		$scope.isMobile = true;
		$scope.contentWidth = "auto";
		//toggleNav(false);
	});
	screenSize.when('desktop, tablet', function(){
		$scope.showmenu = true;
		$scope.isMobile = false;
		toggleNav(false);
	});
	screenSize.when('tablet', function(){
		$scope.contentWidth = $window.innerWidth - 80 + "px";
	})
	if(screenSize.is('tablet')){
		$scope.contentWidth = $window.innerWidth - 80 + "px";
	}

	// SOCKET EVENTI
	// connect: 1,
	// connect_error: 1,
	// connect_timeout: 1,
	// connecting: 1,
	// disconnect: 1,
	// error: 1,
	// reconnect: 1,
	// reconnect_attempt: 1,
	// reconnect_failed: 1,
	// reconnect_error: 1,
	// reconnecting: 1,
	// ping: 1,
	// pong: 1

	var discPopup;
	socket.on('connect_error', function(){
		if(!discPopup){
			discPopup = popupService.notify(
							"DISCONNECTED",
							"Could not connect to the server", false);
		}

	})

	socket.on('reconnect', function(){
		discPopup.close();
		discPopup = undefined;
		socket.emit("online partners");
	})

	socket.on('notification', function(data){
		if(data.actor){ 
			notificationService.parse(data);
		}

		if(data.userNotify){
			userService.updateProperties(data.userNotify, true);
		}
		if(data.userUnNotify){
			userService.updateProperties(data.userUnNotify, false);
		}
		if(data.userData){
			userService.setProperties(data.userData);
		}
	});
		
}]);