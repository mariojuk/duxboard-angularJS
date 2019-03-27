sportApp.controller("consultingController", ['$scope', 'httpService', 'userService', 'notificationService', function ($scope, httpService, userService, notificationService) {

	$scope.question = {
		email : userService.getProperty('email')
	}

	$scope.sendQuestion = function(){
		httpService.postConsultingQuestion($scope.question)
		.then(function(res){
			notificationService.success(res.data, true);
			$scope.question.description = "";
			$scope.question.subject = "";
		})
	}

	$scope.categories = [
		"Physical preparation",
		"Sports psychology",
		"Nutrition",
		"Conflict resolution",
		"Leadership and motivation",
		"Agent acquisition",
		"Post-career advisement"
	]


}])