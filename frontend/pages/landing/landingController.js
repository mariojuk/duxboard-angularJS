sportApp.controller("landingPageController", ['$scope', '$window', '$http', '$timeout', 'popupService', function ($scope, $window, $http, $timeout, popupService) {

	$scope.coverHeight = $window.innerHeight + "px";

	$scope.subsucc = false;
	$scope.subscribe = function(){
		$http.post("/api/preorder", {name: $scope.name, mail: $scope.email})
			.then(function(){
				$scope.subsucc = true;
			})
			.catch(function(res){
				$scope.error = res.data;
				$scope.subForm.$invalid = true;
				$timeout(function(){
					$scope.error = "";
				}, 3000)
			})
	}

	// $scope.presenters = [
	// 	{
	// 		picture: "img/doug_beal.jpg",
	// 		name: "Dr. Doug Beal",
	// 		datetime: "17. July, 2017 16:00 EST",
	// 		webinar: "Managing Sports Teams and Organizations",
	// 		info: "Former CEO of US Volleyball"
	// 	},
	// 	{
	// 		picture: "img/don_mann.jpg",
	// 		name: "Mr. Don Mann", 
	// 		info: "Former Navy SEAL Team SIX Commando, CIA Operative, New York Times Best Selling Author",
	// 		webinar: "Reaching Beyond Boundaries",
	// 		datetime: "11. August, 2017. 16:00 EST"
	// 	},
	// 	{
	// 		picture: "img/ruben_gonzalez.jpg",
	// 		name: "Mr. Ruben Gonzalez",
	// 		info: "Four Time Olympian and the Bestselling Author",
	// 		webinar: "Dream, Struggle, Victory",
	// 		datetime: "27. August, 2017. 16:00 EST"
	// 	}
	// ]

	$http.get("/api/presenter/upcoming").then(function(res){
		$scope.presenters = res.data;
	})

	$http.get("/api/edx/courses/sample").then(function(res){
		$scope.courses = res.data;
	})

	$http.get("/api/payment/plans").then(function(res){
		$scope.payments = res.data;
	})

	$scope.showPrivacyPolicy = function() {
		popupService.privacyPolicy();
	}

	$scope.showTermsOfUse = function() {
		popupService.termsOfUse();
	}

}]);