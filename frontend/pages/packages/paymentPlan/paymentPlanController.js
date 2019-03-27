
sportApp.controller("paymentPlanController", ['$scope', '$http', function ($scope,$http) {


	$http.get("/api/payment/plans").then(function(res){
		console.log(res.data);
		$scope.payments = res.data;
		
	})

}]);

