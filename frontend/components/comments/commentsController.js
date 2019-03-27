sportApp.controller('commentsCtrl', ["$scope", "Upload", "userService", "httpService", "popupService", function($scope, Upload, userService, httpService, popupService) {

		$scope.userId = userService.getProperty("_id");
		$scope.userPic = userService.getProperty("profilePicture");

}]);