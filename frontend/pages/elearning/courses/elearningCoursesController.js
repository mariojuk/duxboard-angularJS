sportApp.controller("elearningCoursesController", ['$scope', '$http', function ($scope, $http) {

	$http.get('api/edx/courses').then(function(res){
		$scope.courses = res.data;
	})

	$scope.goToPage = function(page){
		$scope.courses.results = null;
		$http.get('api/edx/courses?page=' + page).then(function(res){
			$scope.courses = res.data;
		})
	}

}]);