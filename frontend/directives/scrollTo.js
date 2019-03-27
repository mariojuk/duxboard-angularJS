sportApp.directive('scrollTo', ["$uiViewScroll", function($uiViewScroll) {

    return {
        restrict: 'A',
        link: function (scope, element, attr) {
        	element.bind('click', function(){
        		// $uiViewScroll(angular.element( document.querySelector(attr.scrollTo)));
        		var el = angular.element( document.querySelector(attr.scrollTo));
        		$("body,html").animate({scrollTop: el.offset().top + 40}, 600);
        		$("body,html").animate({scrollTop: el.offset().top - 20}, 200);
        		$("body,html").animate({scrollTop: el.offset().top}, 150);
        	});
   		}
    }

}]);