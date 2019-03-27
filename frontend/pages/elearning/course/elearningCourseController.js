sportApp.controller("elearningCourseController", ['$scope', '$http', function ($scope, $http) {

	$http.get("https://randomuser.me/api/?results=4").then(function(res){
		$scope.instructors = res.data.results;
	})

}]);