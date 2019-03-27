sportApp.directive("rightSideBar", [ function(){

	return {
        restrict: 'EA',
		controller: "rightSideBarCtrl",
		templateUrl: "components/rightSideBar/rightSideBar.html",
		scope: {
	        mayknow: '=mayknow',
	        articles:'=articles',
	      }
	};

}]);
