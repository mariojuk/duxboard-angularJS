sportApp.directive("hideOnScroll", ["$document", function ($document) {
    return {
    	scope: true,
    	link: function(scope, element, attrs) {
	        var onScroll = function() {
	            if ($document.scrollTop() > 50) {
	                element.css('opacity', '0');
	                scope.$destroy();
	            }
	        };

	        $document.bind('scroll', onScroll);

	        scope.$on('$destroy', function() {
	          $document.unbind('scroll', onScroll);
	        });
	    }
	}

}]);